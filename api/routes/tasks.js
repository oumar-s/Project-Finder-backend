const express = require('express');
const router = express.Router();
const db = require('../models');
const { Op } = require("sequelize");
const { Task, User, Project } = db;

//Get all task assigned to the user (all statuses)
router.get('/user/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const tasks = await Task.findAll({
            where: {
                assignedTo: userId
            },
            include: [
                {
                  model: User,
                  as: "owner",
                },
                {
                    model: User,
                    as: "assignee",
                },
                {
                  model: Project,
                  as: "project",
                },
                
            ]
        })
        return res.status(200).json(tasks);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

//Get all task assigned to the user (status not completed)
router.get('/incomplete/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const tasks = await Task.findAll({
            where: {
                assignedTo: userId,
                //status does not equal completed
                taskStatus: {
                    [Op.ne]: "Done"
                }
            },
            include: [
                {
                  model: User,
                  as: "owner",
                },
                {
                    model: User,
                    as: "assignee",
                },
                {
                  model: Project,
                  as: "project",
                },
                
            ]
        })
        return res.status(200).json(tasks);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all task in a specific project assigned to the user (all status)
router.get('/:projectId/:userId', async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const userId = req.params.userId;
        const tasks = await Task.findAll({
            where: {
                projectID: projectId,
                assignedTo: userId
            },
            include: [
                {
                  model: User,
                  as: "owner",
                },
                {
                    model: User,
                    as: "assignee",
                },
                {
                  model: Project,
                  as: "project",
                },
                
            ]
        })
        console.log(tasks);
        return res.status(200).json(tasks);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }   
});

//Get all task for a specific project.
router.get('/:projectId', async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const tasks = await Task.findAll({
            where: {
                projectID: projectId
            },
            include: [
                {
                  model: User,
                  as: "owner",
                },
                {
                    model: User,
                    as: "assignee",
                },
                {
                  model: Project,
                  as: "project",
                },
                
            ]
        })
        return res.status(200).json(tasks);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

//Assign a task to a user
router.put('/:taskId/:userId', async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const userId = req.params.userId;
        const task = await Task.findByPk(taskId);
        task.assignedTo = userId;
        await task.save();
        return res.status(200).json(task);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

//Change the status of a task
router.put('/:taskId', async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const status = req.body.status;
        const task = await Task.findByPk(taskId);
        task.taskStatus = status;
        await task.save();
        return res.status(200).json(task);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

//Add a new task
router.post('/:projectId', async (req, res) => {
    console.log("body", req.body)
    try {
        const projectId = req.params.projectId;
        const task = await Task.create({
            taskName: req.body.taskName,
            taskDescription: req.body.taskDescription,
            taskStatus: "In Progress",
            ownerID: req.user.id,
            assignedTo: req.body.assignedTo,
            projectID: projectId,
        })
        res.status(201).json(task);
    } catch (err) {
        console.error("Error creating task:", err);
        res.status(400).json(err);
    }
});

router.delete('/:taskId', async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const task = await Task.findByPk(taskId);
        await task.destroy();
        return res.status(200).json(task);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;