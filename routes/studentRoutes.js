const express = require('express');
const app = express();
const router = express.Router();

router.get('/me', isAuthenticated, (req, res) => {
    // req.user is set by Passport deserializeUser

});

module.exports = router;