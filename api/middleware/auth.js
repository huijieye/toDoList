const jwt = require('jsonwebtoken')

module.exports = (req,res,next) => {
    try{

        const userDecoded = jwt.verify(req.session.token, process.env.JWT_SECRET_KEY)
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