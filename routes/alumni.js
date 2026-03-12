const express = require('express');
const router = express.Router();
const { jwtAuth } = require('../modules/jwt');


router.get('/getAlumni', jwtAuth, async (req, res) => {

    try
    {
        const alumni = await user.find({ role: 'alumni' });
        res.status(200).json(alumni);
    }
    catch(err)
    {
        console.log('Error getting alumni from db', err);
        res.status(500).json({msg : 'something went wrong'});
    }
});

module.exports = router;