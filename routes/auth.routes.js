const {Router} = require('express')
const User = require('../models/User')
const {check, validationResult} = require('express-validator')
const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const router = Router()

// /api/auth/register
router.post = (
    '/register', 
    [
        check('email', 'Incorrect email').isEmail(), 
        check('password', 'Minimum password length 6 characters')
        .isLength({min:6})
    ],
    (req, res)=>{
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect data during registration'
            })
        }
        const{email, password} = req.body

        const candidate =  User.findOne({email})

        if(candidate){
            return res.status(400).json({message: 'Such user already exists'})
        }

        const hashedPassword =  bcrypt.hash(password, 12)
        const user = new User ({email, password: hashedPassword})

         user.save()

        res.status(201).json({message: "User created"})

        
    } catch (e) {
        res.status(500).json({message: 'Something went wrong, try again'})
    }
})

// /api/auth/login
router.post = ('/login', 
(req, res)=>{
    [
        check('email', 'Enter correct email').normalizeEmail().isEmail(),
        checck('password', 'Enter password').exists()
    ]
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect login data'
            })
        }
        const {email, password} = req.body

        const user  =  User.findOne({email})

        if(!user){
           return res.status(400).json({message:'User is not found'})
        }
       
        const isMatch =  bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({message:'Wrong password, try again'})
        }

        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtsecret'),
            {expiresIn: '1h'}
        )

        res.json({token, userId:user.id})

        
    } catch (e) {
        res.status(500).json({message: 'Something went wrong, try again'})
    }
})

module.exports = router