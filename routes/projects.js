const express = require('express');
const router = express.Router();
const project = require('../dataModels/projectModel');
const { jwtAuth } = require('../modules/jwt');


router.post('/create', jwtAuth, async (req, res) => {

    const data = req.body;
    const owner = req.user.id;

    const newProject = new Project({
        name: data.name || "untitled_project",
        owner,
        members: [owner],
        files: [
            {
                fileName: "index.js",
                language: "javascript",
                content: "// Start Coding",
                updatedAt: new Date().toString()
            }
        ]
    });
    
});

router.get('/myProjects', jwtAuth, async (req, res) => {});

router.get('/getProject/:id', jwtAuth, async (req, res) => {});

router.put('/update/:projId/file/:fileId', jwtAuth, async (req, res) => {});

router.delete('/delete/:id', jwtAuth, async (req, res) => {});