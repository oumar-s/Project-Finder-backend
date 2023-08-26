const express = require('express');
const passport = require("../middlewares/authentication");
const router = express.Router();
const db = require('../models');
const { User, Project, Request } = db;

router.post('/:projectId', async (req, res) => {
	try {
		const id = req.params.projectId;
		const project = await Project.findByPk(req.params.projectId);

		if (!project) {
			return res.status(404).json({ error: 'Project not found' });
		}

		Request.create({
			requesterId: req.user.id,
			projectId: req.params.projectId,
			ownerId: project.ownerID,
			status: "Pending"
		})
		return res.json(project);
	} catch (err) {
		return res.status(500).json({ error: 'Internal server error' });
	}
})

router.get("/myRequests", async (req, res) => {
	const reques = await Request.findAll({
		where: { requesterId: req.user.id, status: "Pending" },
		include: [
			{
				model: User,
				as: "owner",
				attributes: ["id", "firstName", "lastName"],
			},
			{
				model: Project,
				as: "project",
				attributes: ["projectTitle", "projectDescription"],
			},
		],
	})
		.then((requests) => {
			if (requests.length === 0) {
				res.json([]);

			} else {
				res.json(requests);
			}
		})
		.catch((err) => {
			res.status(400).json(err);
		});
});
router.get("/otherRequests", (req, res) => {

	Request.findAll({
		where: { ownerId: req.user.id, status: "Pending" },
		include: [
			{
				model: User,
				as: "requester",
				attributes: ["id", "firstName", "lastName"],
			},
			{
				model: Project,
				as: "project",
				attributes: ["projectTitle", "projectDescription"],
			},
		],
	})
		.then((requests) => {
			if (requests.length === 0) {
				res.json([]);

			} else {
				res.json(requests);
			}
		})
		.catch((err) => {
			res.status(400).json(err);
		});
});
router.post("/approve/:requestId", (req, res) => {
	Request.findByPk(req.params.requestId).then((request) => {
		if (!request) {
			return res.sendStatus(404);
		}
		request.update({ status: "Approved" });

		res.json({ message: "Successfully Approve the Request" });
	});
});
router.post("/disapprove/:requestId", (req, res) => {
	Request.findByPk(req.params.requestId).then((request) => {
		if (!request) {
			return res.sendStatus(404);
		}
		request.update({ status: "Denied" });

		res.json({ message: "Successfully Approve the Request" });
	});
});
router.get("/member", (req, res) => {

	Request.findAll({
		where: { requesterId: req.user.id },
		include: [
			{
				model: User,
				as: "owner",
				attributes: ["id", "firstName", "lastName"],
			},
			{
				model: Project,
				as: "project",
				attributes: ["projectTitle", "projectDescription"],
			},
		],
	})
		.then((requests) => {
			if (requests.length === 0) {
				res.json([]);

			} else {
				res.json(requests);
			}
		})
		.catch((err) => {
			res.status(400).json(err);
		});
});
router.get("/owner", (req, res) => {

	Request.findAll({
		where: { ownerId: req.user.id },
		include: [
			{
				model: User,
				as: "requester",
				attributes: ["id", "firstName", "lastName"],
			},
			{
				model: Project,
				as: "project",
				attributes: ["projectTitle", "projectDescription"],
			},
		],
	})
		.then((requests) => {

			if (requests.length === 0) {
				res.json([]);

			} else {
				res.json(requests);
			}
		})
		.catch((err) => {
			res.status(400).json(err);
		});
});

//to get members of a particular projects
router.get("/members/:projectId", (req, res) => {

	Request.findAll({
		where: { projectId: req.params.projectId, status: "Approved" },
		include: [
			{
				model: User,
				as: "member",
				attributes: ["id", "firstName", "lastName"]
			}
		],
	})
		.then((requests) => {
			if (requests.length === 0) {
				res.json([]);

			} else {
				res.json(requests);
			}
		})
		.catch((err) => {
			res.status(400).json(err);
		});
});
module.exports = router;