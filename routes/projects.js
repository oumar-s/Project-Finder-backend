const express = require('express');
const router = express.Router();
const db = require('../models');
const {Project} = db;

router.get('/', (req, res) => {
    Project.findAll()
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
      const project = await Project.findByPk(projectId);
      
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
    
    const {
        projectTitle,
        projectDescription
    } = req.body;
    Project.create({
        projectTitle,
        projectDescription
    })
    .then((newProject) => {
        res.status(201).json(newProject);
    })
    .catch((err) => {
        res.status(400).json(err);
    })
});

module.exports = router;