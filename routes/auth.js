const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { SignupValidation, loginValidation } = require('../validation')
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res) => {

    const {error} = SignupValidation(req.body) 
    if(error) return res.status(400).send(error.details[0].message)

    //check duplicate in db
    const email = await User.findOne({email: req.body.email})
    if(email) return res.status(400).send('email registered')


    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

     const user = new User({
         name: req.body.name,
         email: req.body.email,
         password: hashedPassword
     })

     try{
         const userData = await user.save()
         res.send({user: user._id})
     } catch(err){
        res.status(400).send(err)
     }
})

router.post('/login', async (req, res) => {
    
    const {error} = loginValidation(req.body) 
    if(error) return res.status(400).send(error.details[0].message)

        //check if email exists in Database
        const user = await User.findOne({email: req.body.email})
        if(!user) return res.status(400).send('User not registered')
        
        //check password
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if(!validPassword) return res.status(400).send('Invalid Password')


        const token = jwt.sign({_id: user._id}, 'fgdfgdkwn')
        res.header('auth-token', token).send(token)
})

module.exports = router