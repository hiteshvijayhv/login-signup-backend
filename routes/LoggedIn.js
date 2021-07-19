const router = require('express').Router()
const verify = require('../verifyToken')
const User = require('../models/User')
const jwt = require('jsonwebtoken');

router.get('/', verify, (req, res) => {
  
    const token = req.header('auth-token')
    if(!token) return res.status(401).send('Access denined')

    var userId;
    try{
        var userId = jwt.verify(token, 'fgdfgdkwn')
    }catch(err){
        res.status(400).status('Invalid Token')
    }
    const id = userId._id
    var userObj;
    const d = User.findById(id, function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.json(result);
          userObj = result
        }
      })
})

module.exports = router