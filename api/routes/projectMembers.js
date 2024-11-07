const express = require('express');
const passport = require("../middlewares/authentication");
const router = express.Router();
const db = require('../models');
const { Project, ProjectMember, Team, User } = db;

//Get all projects the user belongs to. Include team.
router.get('/:userId', async (req, res) => {
    console.log("Get all project user log");
    try {
        const userId = req.params.userId;
        const project = await ProjectMember.findAll({
            where: {
                userID: userId
            },
            include: [
                {
                    model: Project,
                    as: "project",
                    include: [
                        {
                           model: Team,
                           as: "team",
                        },
                        {
                            model: User,
                            as: "owner",
                            attributes: ["id", "firstName", "lastName"],
                        }
                    ]
                }
            ]
        })
        res.status(200).json(project);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

//Get all members of a specific project
router.get('/members/:projectId', async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const projects = await ProjectMember.findAll({
            where: {
                projectID: projectId
            },
            include: [
                {
                    model: User,
                    as: "user",
                }
            ]
        })
        res.status(200).json(projects);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

//Add a user to a project
router.post('/:projectId/:userId', async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const userId = req.params.userId;
        const project = await ProjectMember.create({
            projectID: projectId,
            userID: userId
        })
        res.status(201).json(project);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;