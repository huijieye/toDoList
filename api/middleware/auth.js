const jwt = require('jsonwebtoken')

module.exports = (req,res,next) => {
    try{
        console.log('l5: '+req.headers['authorization'])
        const userDecoded = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET_KEY)
        req.userData = userDecoded

    }
    catch(err){
        console.log(err)
        res.status(401).json({
            error:err
        })
    }
    next()

}