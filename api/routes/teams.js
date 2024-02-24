const express = require('express');
const router = express.Router();
const db = require('../models');
const { Team, User } = db;

//Get all projects
router.get('/', async (req, res) => {
  try {

    const teams = await Team.findAll({
      include: [
        {
          model: User,
          as: "owner",
          attributes: ["id", "firstName", "lastName"],
        }
      ]
    })
    console.log(teams);
    return res.status(200).json(teams);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

//Get a specific team
router.get('/:teamId', async (req, res) => {
  try {
    const teamId = req.params.teamId;
    const team = await Team.findByPk(teamId, {
      include: [
        {
          model: User,
          as: "owner",
          attributes: ["id", "firstName", "lastName"],
        }
      ]
    });

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    return res.json(team);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }

})



router.post('/', (req, res) => {
  const ownerid = req.user.id;
  const {
    teamName: teamName,
    teamDescription: teamDescription,
  } = req.body;
  Team.create({
    teamName,
    teamDescription,
    teamIcon: null,
    teamBanner: null,
    teamStatus: "Open",
    ownerID: ownerid
  })
    .then((newTeam) => {
      res.status(201).json(newTeam);
    })
    .catch((err) => {
      res.status(400).json(err);
    })
});

module.exports = router;