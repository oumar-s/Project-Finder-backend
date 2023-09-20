const express = require('express');
const db = require('./models');
const app = express();
const cors = require('cors');
const expressSession = require("express-session");
const pgSession = require('connect-pg-simple')(expressSession);
const morgan = require("morgan");
const passport = require("./middlewares/authentication");
const PORT = process.env.PORT || 8080;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: '*',
  credentials: false,
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization'
}));


// setup passport and session cookies
app.use(
  expressSession({
    store: new pgSession({
      conString : process.env.DATABASE_URL,                // Connection pool
      tableName : 'sessions',   // Use another table-name than the default "session" one
      // Insert connect-pg-simple options here
      createTableIfMissing: true
    }),
    secret: process.env.SESSION_SECRET,
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

// // for production use, we serve the static react build folder
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../client/build")));

//   // all unknown routes should be handed to our react app
//   app.get("*", function (req, res) {
//     res.sendFile(path.join(__dirname, "../client/build", "index.html"));
//   });
// }

app.get('/', (req, res) => {
  res.send('Hello World');

});

db.sequelize.sync({ force: false });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});