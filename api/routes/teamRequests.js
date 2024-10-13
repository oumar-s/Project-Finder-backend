const express = require('express');
const passport = require("../middlewares/authentication");
const router = express.Router();
const db = require('../models');
const { TeamRequest } = db;

//Get all requests of a specific team
router.get('/:teamId', async (req, res) => {
	try {
		const teamId = req.params.teamId;
		const requests = await TeamRequest.findAll({
			where: {
				teamID: teamId
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

//Add a request to join a specific team
router.post('/:teamId', async (req, res) => {
	try {
		const teamId = req.params.teamId;
		const userId = req.user.id;
		const team = await TeamRequest.create({
			status: "Pending",
			teamID: teamId,
			userID: userId,
		})
		res.status(201).json(team);
	} catch (err) {
		res.status(400).json(err);
	}
});

module.exports = router;