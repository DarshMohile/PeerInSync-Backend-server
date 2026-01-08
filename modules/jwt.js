const jwt = require('jsonwebtoken');

const jwtAuth = (req, res, next) => {

    //extract the jwt token from req header
    const token = req.headers.authorization.split(' ')[1];

    if(!token)
    {
        return res.status(401).json({msg: 'Unauthorized'});
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

    return jwt.sign(userData, process.env.JWT_SECRET);
}


module.exports = {jwtAuth, generateToken};