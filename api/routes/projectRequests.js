const express = require('express');
const passport = require("../middlewares/authentication");
const router = express.Router();
const db = require('../models');
const { ProjectRequest } = db;

//Get all requests of a specific project
router.get('/:projectId', async (req, res) => {
	try {
		const projectId = req.params.projectId;
		const requests = await ProjectRequest.findAll({
			where: {
				projectID: projectId
			},
			include: [
				{
					model: User,
					as: "user",
					attributes: ["id", "firstName", "lastName"],
				}
			]
		})
		res.status(200).json(requests);
	} catch (err) {
		res.status(400).json(err);
	}
});

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