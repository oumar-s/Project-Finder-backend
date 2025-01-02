const express = require('express');
const db = require('./models');
const app = express();
const path = require("path");
const expressSession = require("express-session");
const morgan = require("morgan");
const passport = require("./middlewares/authentication");
const PORT = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const admin = require('firebase-admin');

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
    secret: process.env.SESSION_SECRET || "TRzOou3MMC@v#K6f8vz3PogYrz!jgjJ%E$@qzMlf^CEAUHjAEt",
    resave: false,
    saveUninitialized: true,
  })
);

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