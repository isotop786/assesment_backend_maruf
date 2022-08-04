const User = require('../models/user.model');
const {verify} = require('jsonwebtoken')

exports.AuthMiddleware = async (req, res, next) =>{
    try{
        const jwt = req.cookies['t']

        const payload = verify(jwt, process.env.JWT_SECRET)

        if(!payload){
            return res.status(401).json({
                message:'Unauthenticated user'
            })
        }

        req["user"] = await User.findOne(payload.id)

        // console.log(req["user"].id);

        next()
    }
    catch(err){
        return res.status(401).send({
            message:'Unauthenticated user'
        })
    }
}

