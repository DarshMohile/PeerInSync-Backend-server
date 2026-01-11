const express = require('express');
const app = express();
const router = express.Router();

router.get('/me', isAuthenticated, (req, res) => {

    

});



module.exports = router;