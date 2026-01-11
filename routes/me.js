const express = require('express');
const { jwtAuth } = require('../modules/jwt');
const router = express.Router();

router.get('/me', jwtAuth, async (req, res) => {

    const uid = req.user.id;
    const user = await userModel.findOne({ email: uid })

    if (!user) 
    {
        return res.status(404).json({msg: 'User Data Not Found'});
    }

    res.status(200).json(user);

});



module.exports = router;