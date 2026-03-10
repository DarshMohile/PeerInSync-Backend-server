const express = require('express');
const router = express.router();
const project = require('../dataModels/projectModel');
const { jwtAuth } = require('../modules/jwt');


router.post('/create', jwtAuth, async (req, res) => {

    const data = req.body;
    const owner = req.user.id;


    const mappedData = {
    }
});

router.get('/myProjects', jwtAuth, async (req, res) => {});

router.get('/getProject/:id', jwtAuth, async (req, res) => {});

router.put('/update/:id', jwtAuth, async (req, res) => {});

router.delete('/delete/:id', jwtAuth, async (req, res) => {});