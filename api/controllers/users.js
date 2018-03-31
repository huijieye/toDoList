const mongoose = require('mongoose')
const User = require('../model/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.user_signup = (req,res,next)=>{

    User.findOne({email: req.body.email}).then(user => {
        if (user !== null) {
            res.status(409).json({})
        }
        else{
            bcrypt.hash(req.body.password, 10,(err,hash) => {
                if(err){
                    res.status(500).json({})
                }
                const user = new User({
                    _id: mongoose.Types.ObjectId(),
                    email: req.body.email,
                    password: hash
                })
                console.log(user)
                user.save().then(result => {
                    res.status(201).json({
                        message:"user created",
                        result
                    })
                }).catch(err => {
                    res.status(500).json({})
                })
            })
        }
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    })
}

exports.user_login = (req, res, next) => {
    User.findOne({email: req.body.email}).then(user => {

        if (user != null) {
            bcrypt.compare(req.body.password, user.password, (err,result) => {
                if (err) {
                    res.status(401).json({
                        error: 'verification erreur'
                    })
                } else {
                    req.session.userId = user._id
                    const token = jwt.sign({
                        id: user._id,
                        email: user.email,
                    }, process.env.JWT_SECRET_KEY, {expiresIn: "1h"})

                    res.redirect('task/all/'+user._id)
                    // res.status(200).json({
                    //     message: "authorisation",
                    //     token,
                    // })
                }

            })
        }
        else{
            res.status(409).json({})
        }
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    })
}