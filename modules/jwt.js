const jwt = require('jsonwebtoken');

const jwtAuth = (req, res, next) => {

    //check if the headers have authorization token
    const token = req.cookies?.token;

    if(!token)
    {
        return res.status(401).json({msg: 'You are not logged in.'});
    }

    try
    {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(err)
    {
        return res.status(401).json({msg: 'Invalid Token'});
    }

}


const generateToken = (userData) => {

    return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn: '24h'});
}


module.exports = {jwtAuth, generateToken};