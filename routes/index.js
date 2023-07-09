const express = require('express');
const router = express.Router();
const projectRoutes = require('./projects.js');
const authRoutes = require("./auth.js");

router.use('/projects', projectRoutes);
router.use("/auth", authRoutes);

module.exports = router;

