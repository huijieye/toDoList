const router = require('express').Router()
const mongoose = require('mongoose')
const User = require('../model/users')
const { user_signup, user_login } = require('../controllers/users')

router.get('/',(req,res) => {
    res.render('login.ejs')
})

router.get('/signIn', (req,res)=>{
    res.render('signIn.ejs')
})

router.post('/inscription', user_signup)

router.post('/login', user_login)

module.exports = router