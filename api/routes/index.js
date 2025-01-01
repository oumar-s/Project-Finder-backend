const express = require('express');
const router = express.Router();
const authRoutes = require("./auth.js");
const projectRoutes = require('./projects.js');
const projectMemberRoutes = require('./projectMembers.js');
const projectRequestRoutes = require('./projectRequests.js');
const teamRoutes = require('./teams.js');
const teamMemberRoutes = require('./teamMembers.js');
const teamRequestRoutes = require('./teamRequests.js');
const taskRoutes = require("./tasks.js");


router.use("/auth", authRoutes);
router.use('/projects', projectRoutes);
router.use('/projectMembers', projectMemberRoutes);
router.use('/projectRequests', projectRequestRoutes);
router.use('/teams', teamRoutes);
router.use('/teamMembers', teamMemberRoutes);
router.use('/teamRequests', teamRequestRoutes);
router.use('/tasks', taskRoutes);

module.exports = router;

