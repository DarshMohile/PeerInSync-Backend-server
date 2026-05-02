const express = require('express');
const router = express.Router();
const Project = require('../dataModels/projectModel');
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
                fileName: data.fileName || "index.js",
                language: data.language || "javascript",
                content: "// Start Coding",
                updatedAt: new Date()
            }
        ]
    });

    await newProject.save();
    res.status(201).json(newProject);

});

router.get('/myProjects', jwtAuth, async (req, res) => { });

router.get('/getProject/:id', jwtAuth, async (req, res) => {

    try {
        const project = await Project.findById(req.params.id);
        res.json(project);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch project" });
    }
});

router.put('/update/:projId/file/:fileId', jwtAuth, async (req, res) => {

    try {
        const { content } = req.body;

        const project = await Project.findOneAndUpdate(
            { _id: req.params.projId, "files._id": req.params.fileId },
            {
                $set: {
                    "files.$.content": content,
                    "files.$.updatedAt": new Date()
                }
            },
            { new: true }
        );

        res.json(project);
    } catch (err) {
        res.status(500).json({ error: "Update failed" });
    }
});

router.delete('/delete/:id', jwtAuth, async (req, res) => { });

module.exports = router;