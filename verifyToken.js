const jwt = require('jsonwebtoken');
const { use } = require('./routes/auth');

module.exports = function(req, res, next){
    const token = req.header('auth-token')
    if(!token) return res.status(401).send('Access denined')


    try{
        const userId = jwt.verify(token, 'fgdfgdkwn')
        req.user = userId;
        next()
    }catch(err){
        res.status(400).status('Invalid Token')
    }

}

