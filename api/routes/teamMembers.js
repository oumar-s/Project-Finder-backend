const express = require('express');
const router = express.Router();
const db = require('../models');
const { User, Project, TeamMember, Team } = db;

//Get all members of a specific team.
router.get('/:teamId', async (req, res) => {
    try {
        const teamId = req.params.teamId;
        const team = await TeamMember.findAll({
            where: {
                teamID: teamId
            },
            include: [
                {
                    model: User,
                    as: "user"
                },
                {
                    model: Team,
                    as: "team"
                }
            ]
        })
        console.log(team);
        return res.status(200).json(team);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }   
});

//Get all teams for a specific user.
router.get('/teams/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await TeamMember.findAll({
            where: {
                userID: userId
            },
            include: [
                {
                    model: Team,
                    as: "team",
                    include: [
                        {
                            model: User,
                            as: "owner",
                        }
                    ]
                }
            ]
        })
        console.log(user);
        return res.status(200).json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

//Add a user to a team
router.post('/:teamId/:userId', async (req, res) => {
    try {
        const teamId = req.params.teamId;
        const userId = req.params.userId;
        const team = await TeamMember.create({
            teamID: teamId,
            userID: userId
        })
        res.status(201).json(team);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

//Remove a user from a team
router.delete('/:memberId', async (req, res) => {
    try {
        const memberId = req.params.memberId;
        const member = await TeamMember.destroy({
            where: {
                id: memberId
            }
        })
        res.status(200).json(member);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;