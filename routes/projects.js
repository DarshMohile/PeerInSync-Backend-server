const express = require('express');
const router = express.Router();
const projectModel = require('../dataModels/projectModel');
const { jwtAuth } = require('../modules/jwt');


router.post('/create', jwtAuth, async (req, res) => {

    const data = req.body;
    const uid = req.user.id;

    console.log(req.body);

    const newProject = new projectModel({
        project_title: data.project_title || "untitled_project",
        owner: uid,
        collaborators: Array.isArray(data.collaborators)
            ? data.collaborators
            : [],
        files: [
            {
                fileName: data.fileName || "first_file.js",
                language: data.language || "javascript",
                content: "//start coding or make a new file for another language!",
                updatedAt: new Date()
            }
        ]
    });

    console.log("New project is: " + newProject);

    await newProject.save();
    res.status(201).json(newProject);
});

router.get('/myProjects', jwtAuth, async (req, res) => {

    try {
        const projects = await projectModel.find({ owner: req.user.id });
        console.log(projects);
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch projects" });
    }
});

router.get('/getProject/:id', jwtAuth, async (req, res) => {

    try {
        const project = await projectModel.findById(req.params.id);
        res.json(project);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch project" });
    }
});

router.put('/update/:projId/file/:fileId', jwtAuth, async (req, res) => {

    try {
        const { content } = req.body;

        const project = await projectModel.findOneAndUpdate(
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


router.post('/addFile/:projId', jwtAuth, async (req, res) => {
    try {
        const { fileName, language } = req.body;

        const newFile = {
            fileName,
            language,
            content: "",
            updatedAt: new Date()
        };

        const project = await projectModel.findByIdAndUpdate(
            req.params.projId,
            { $push: { files: newFile } },
            { new: true }
        );

        res.json(project);
    } catch (err) {
        res.status(500).json({ error: "Failed to add file" });
    }
});


router.put('/rename/:projId/file/:fileId', jwtAuth, async (req, res) => {
    try {
        const { projId, fileId } = req.params;
        const { fileName, language } = req.body;

        const updatedProject = await projectModel.findOneAndUpdate(
            { _id: projId, "files._id": fileId },
            {
                $set: {
                    "files.$.fileName": fileName,
                    "files.$.language": language
                }
            },
            { new: true }
        );

        if (!updatedProject) {
            return res.status(404).json({ message: "Project or file not found" });
        }

        res.json(updatedProject);
    } catch (err) {
        console.error("Rename failed:", err);
        res.status(500).json({ message: err.message });
    }
});


router.put('/update/:projId', jwtAuth, async (req, res) => {
    try {
        const updateData = {};

        if (req.body.project_title !== undefined) {
            updateData.project_title = req.body.project_title;
        }

        if (req.body.collaborators !== undefined) {
            updateData.collaborators = req.body.collaborators;
        }

        const project = await projectModel.findByIdAndUpdate(
            req.params.projId,
            { $set: updateData },
            { new: true }
        );

        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }

        res.json(project);

    } catch (err) {
        res.status(500).json({ error: "Update failed" });
    }
});


router.delete('/deleteFile/:projId/:fileId', jwtAuth, async (req, res) => {
    try {
        const project = await projectModel.findByIdAndUpdate(
            req.params.projId,
            { $pull: { files: { _id: req.params.fileId } } },
            { new: true }
        );

        res.json(project);
    } catch (err) {
        res.status(500).json({ error: "Delete failed" });
    }
});


router.delete('/delete/:id', jwtAuth, async (req, res) => {

    try {
        const project = await projectModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: "Project deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Delete failed" });
    }
});

module.exports = router;