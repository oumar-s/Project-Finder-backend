const express = require('express');
const passport = require("../middlewares/authentication");
const router = express.Router();
const db = require('../models');
const {User, Project, Request} = db;

router.post('/:projectId', async (req, res) => {
    //const { projectId } = req.params.projectId;
    try {
        const id = req.params.projectId;
        //console.log(req.params.projectId);
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
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
})

module.exports = router;