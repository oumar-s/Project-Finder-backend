const express = require('express');
const router = express.Router();
const db = require('../models');
const { Project, User } = db;

router.get('/', (req, res) => {
  console.log("Get all project user log: ", req.user);
  Project.findAll({
    include: [
      {
        model: User,
        as: "owner",
        attributes: ["id", "firstName", "lastName"],
      }
    ]
  })
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
router.get('/:projectId', async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const project = await Project.findByPk(projectId, {
      include: [
        {
          model: User,
          as: "owner",
          attributes: ["id", "firstName", "lastName"],
        }
      ]
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    return res.json(project);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/', (req, res) => {
  const ownerid = req.user.id;
  const {
    title: projectTitle,
    description: projectDescription,
  } = req.body;
  Project.create({
    projectTitle,
    projectDescription,
    ownerID: ownerid
  })
    .then((newProject) => {
      res.status(201).json(newProject);
    })
    .catch((err) => {
      res.status(400).json(err);
    })
});

module.exports = router;