const express = require('express');
const passport = require("../middlewares/authentication");
const router = express.Router();
const db = require('../models');
const { ProjectRequest, User, Project, ProjectMember } = db;

//Get all requests of a specific project
router.get('/:projectId', async (req, res) => {
	try {
		const projectId = req.params.projectId;
		const requests = await ProjectRequest.findAll({
			where: {
				projectID: projectId,
				status: "Pending"

			},
			include: [
				{
					model: User,
					as: "user",
					attributes: ["id", "firstName", "lastName"],
				},
				{
					model: Project,
					as: "project",
					attributes: ["id", "projectTitle"],
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

		// Check if user is already a project member
		const existingMember = await ProjectMember.findOne({
			where: {
				projectID: projectId,
				userID: userId
			}
		});
		if (existingMember) {
			return res.status(400).json({ 
				code: "ALREADY_MEMBER",
				error: "You are already a member of this project" 
			});
		}

		// Check for existing pending request
		const existingRequest = await ProjectRequest.findOne({
			where: {
				projectID: projectId,
				userID: userId,
				status: "Pending"
			}
		});
		if (existingRequest) {
			return res.status(400).json({ 
				code: "DUPLICATE_REQUEST",
				error: "You already have a pending request for this project" 
			});
		}

		const project = await ProjectRequest.create({
			status: "Pending",
			projectID: projectId,
			userID: userId,
		});
		res.status(201).json(project);
	} catch (err) {
		res.status(400).json({ 
			code: "REQUEST_FAILED",
			error: "Failed to create project request. Try again later." 
		});
	}
});

//update a request
router.put('/:requestId', async (req, res) => {
	try {
		const requestId = req.params.requestId;
		const status = req.body.status;
		const request = await ProjectRequest.findByPk(requestId);
		request.status = status;
		await request.save();
		res.status(200).json(request);
	} catch (err) {
		res.status(400).json(err);
	}
});

module.exports = router;