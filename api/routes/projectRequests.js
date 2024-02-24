const express = require('express');
const passport = require("../middlewares/authentication");
const router = express.Router();
const db = require('../models');
const { ProjectRequest } = db;

//Add a request to join a specific project

router.post('/:projectId', async (req, res) => {
	try {
		const projectId = req.params.projectId;
		const userId = req.user.id;
		const project = await ProjectRequest.create({
			status: "Pending",
			projectID: projectId,
			userID: userId,
		})
		res.status(201).json(project);
	} catch (err) {
		res.status(400).json(err);
	}
});

module.exports = router;