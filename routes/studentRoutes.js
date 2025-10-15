const express = require('express');
const app = express();
const router = express.Router();

router.get('/me', isAuthenticated, (req, res) => {
    // req.user is set by Passport deserializeUser

    console.log(req.user.fName);

    res.status(200).json({
        fName: req.user.fName,
        lName: req.user.lName,
        email: req.user.email
    });
});

module.exports = router;