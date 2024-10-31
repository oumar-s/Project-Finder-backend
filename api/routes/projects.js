const express = require('express');
const router = express.Router();
const db = require('../models');
const { Project, Team, User, ProjectMember } = db;

router.get('/', (req, res) => {
  //console.log("Get all project user log: ", req.user);
  //console.log("Get all project req log: ", req);
  Project.findAll({
    include: [
      {
        model: User,
        as: "owner",
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: Team,
        as: "team",
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
  console.log("Get all project user log");
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


//Add a new project

router.post('/:teamId', async (req, res) => {
  try {
    console.log(req.user);
    const ownerId = req.user.id;
    const project = await Project.create({
      teamID: req.params.teamId,
      projectTitle: req.body.projectTitle,
      projectDescription: req.body.projectDescription,
      ownerID: ownerId
    })
    return res.status(200).json(project);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

//Get all projects for a specific team.

router.get('/teams/:teamId', async (req, res) => {
  console.log("correct route");
  try {
    const teamId = req.params.teamId;
    const team = await Project.findAll({
      where: {
        teamID: teamId
      },
      include: [
        {
          model: User,
          as: "owner",
          attributes: ["id", "firstName", "lastName"],
        }
      ]
    })

    return res.status(200).json(team);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

//Get all projects for a team the user belongs to.

router.get('/:teamId/:userId', async (req, res) => {
  try {
      const teamId = req.params.teamId;
      const userId = req.params.userId;

      const projects = await Project.findAll({
          where: {
              teamID: teamId
          },
          include: [
              {
                  model: ProjectMember,
                  as: "projectMembers",
                  where: {
                      userID: userId
                  },
                  required: true
              },
              {
                  model: User,
                  as: "owner"
              }
          ]
      });

      console.log("Get all projects for a team the user belongs to");
      return res.status(200).json(projects);
  } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
  }
});





module.exports = router;