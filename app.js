const express = require('express');
const db = require('./models');
const app = express();
const expressSession = require("express-session");
const morgan = require("morgan");
const passport = require("./middlewares/authentication");
const PORT = process.env.PORT || 8080;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// setup passport and session cookies
app.use(
  expressSession({
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