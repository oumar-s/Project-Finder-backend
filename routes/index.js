const express = require('express');
const router = express.Router();
const projectRoutes = require('./projects.js');

router.use('/projects', projectRoutes);


module.exports = router;

