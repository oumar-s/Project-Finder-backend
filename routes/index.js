const express = require('express');
const router = express.Router();
const projectRoutes = require('./projects.js');
const authRoutes = require("./auth.js");
const requestRoutes = require("./requests.js");

router.use('/projects', projectRoutes);
router.use("/auth", authRoutes);
router.use('/requests', requestRoutes);

module.exports = router;

