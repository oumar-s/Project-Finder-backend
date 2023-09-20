const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const { User } = require("../models");

function passwordsMatch(submittedPassword, storedPasswordHash) {
  return bcrypt.compareSync(submittedPassword, storedPasswordHash);
}

/*
  The following code runs at login time.
*/
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (email, password, done) => {
      User.findOne({ where: { email } })
        .then((user) => {
          if (!user) {
            console.log("\n\nFailed Login: user does not exist\n\n");
            return done(null, false, { message: "Failed Login" });
          }

          if (passwordsMatch(password, user.passwordHash) === false) {
            console.log("\n\nFailed Login: passwords did not match\n\n");
            return done(null, false, { message: "Failed Login" });
          }

          console.log("\n\nSuccessful Login\n\n");
          return done(null, user, { message: "Successfully Logged In!" });
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("User from serialize: ", user)
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("Deserialize: Called", id)
  User.findByPk(id)
    .then((user) => {
      if (!user) {
        console.log("No User Found. From Deserialize: ", user)
        done(null, false);
        return;
      }
      console.log("User from Deserialize: ", user)
      done(null, user);
      
      return;
    })
    .catch((err) => done(err, null));
});

passport.isAuthenticated = () => (req, res, next) =>
  req.user ? next() : res.sendStatus(401);

module.exports = passport;