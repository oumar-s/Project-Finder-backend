const express = require('express');
const db = require('./models');
const app = express();
const path = require("path");
//const cors = require('cors');
const expressSession = require("express-session");
//const pgSession = require('connect-pg-simple')(expressSession);
const morgan = require("morgan");
const passport = require("./middlewares/authentication");
const PORT = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
// const dotenv = require('dotenv').config();

// //set up dotenv
// if (dotenv.error) {
//   throw dotenv.error;
// }

console.log('starting app');
let serviceAccount;
if(process.env.NODE_ENV === "production"){
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
  serviceAccount = require("./firebase.json");
}
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// setup passport and session cookies
app.use(
  expressSession({
    // store: new pgSession({
    //   conString : process.env.DATABASE_URL,                // Connection pool
    //   tableName : 'sessions',   // Use another table-name than the default "session" one
    //   // Insert connect-pg-simple options here
    //   createTableIfMissing: true
    // }),
    secret: process.env.SESSION_SECRET || "supersecretkey",
    resave: false,
    saveUninitialized: true,
  })
);
// app.use(cors({
//   origin: 'https://project-finder-frontend-production.up.railway.app',
//   credentials: true,
//   methods: 'GET, POST, PUT, DELETE'
// }));

app.use(passport.initialize());
app.use(passport.session());

// add http request logging to help us debug and audit app use
const logFormat = process.env.NODE_ENV === "production" ? "combined" : "dev";
app.use(morgan(logFormat));

app.use('/api', require('./routes'))

// for production use, we serve the static react build folder
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  // all unknown routes should be handed to our react app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

app.get('/', (req, res) => {
  res.send('Hello World');

});

db.sequelize.sync({ force: false });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});