const express = require('express');
const db = require('./models');
const app = express();
const expressSession = require("express-session");
const passport = require("./middlewares/authentication");
const PORT = process.env.PORT || 8080;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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
  

app.use('/api', require('./routes'))
app.get('/', (req, res) => {
    res.send('Hello World');
    
});


db.sequelize.sync({force: false});
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});