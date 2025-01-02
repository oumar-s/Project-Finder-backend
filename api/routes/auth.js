const router = require("express").Router();
const { User } = require("../models");
const passport = require("../middlewares/authentication");
const admin = require('firebase-admin');
const bcrypt = require('bcryptjs');

router.post("/signup", async (req, res) => {
  try {
    const user = await User.create(req.body);
    user.password = undefined;
    req.login(user, () => res.status(201).json(user));
  } catch (err) {
    res.status(400).json({ msg: "Failed Signup", err });
  }
});

router.post("/login", passport.authenticate("local"), async (req, res) => {
  try {
    const firebaseToken = await admin.auth().createCustomToken(req.user.id.toString());
    res.json({user: req.user, token: firebaseToken}); //res.json(req.user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.get("/login", (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.sendStatus(401);
  }
});

router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.status(200).json({ message: "Logout successful" });
  });
});

// Route to get the current logged-in user
router.get('/user', async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['passwordHash'] }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to get a user by given id
router.get('/user/:userId', async (req, res) => {
  console.log("user Id:", req.params.userId);
  const userId = req.params.userId;
  try {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['passwordHash'] }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/user/update', async (req, res) => {
  try {
    const { firstName, lastName, /*email,*/ bio, skills, profilePic } = req.body;
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    //user.email = email || user.email;
    user.bio = bio || user.bio;
    user.skills = skills || user.skills;
    user.profilePic = profilePic || user.profilePic;

    await user.save();

    res.json({ message: 'Profile updated successfully', user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to update email
router.put('/update-email', async (req, res) => {
  try {
    const { userId, newEmail } = req.body;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.email = newEmail;
    await user.save();
    return res.status(200).json({ message: 'Email updated successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to update password
router.put('/update-password', async (req, res) => {
  try {
    const { userId, newPassword } = req.body;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.password = newPassword; // Set the virtual password field
    await user.save(); // This will trigger the beforeSave hook to hash the password
    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;