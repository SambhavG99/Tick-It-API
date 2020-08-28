const jwt = require('jsonwebtoken');
const config = require('config');

module.exports.auth = function (req,res,next){
    const token  = req.header('x-auth-token');
    if(!token) return res.status(401).send("Access Denied. No token found.");
    try{
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    }catch(ex){
        res.status(401).send('Invalid Token');
    }
}

