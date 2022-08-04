const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/user.model')
const expressJWT = require('express-jwt')


// Signup 
exports.userSignup = async (req,res)=>{

    const userExists = await User.findOne({email: req.body.loginName})
    if(userExists){
        return res.status(403).json({
            error:'LoginName  is taken'
        });
    }

    const user = await new User(req.body);
    await user.save();

    res.status(201).json({
        msg:'Signup success',
        user
    })
}

// Signin 
exports.userSignin = async (req,res)=>{
    const {email, password} = req.body

    User.findOne({email},(err,user)=>{
        if(err || !user){
            return res.status(401).json({
                error:"User not found."
            })
        }

        if(!user.authenticate(password)){
            return res.status(401).json({
                error:"Wrong Email or Password"
            })
        }

        // token generate
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)

        res.cookie('t',token,{expire: new Date() + 9999})

        const {_id, name, email} = user;

        return res.json({
            token,
            user: {_id, name,email}
        })

    });
}

exports.signout = async (req,res) =>{
    res.cookie('t','', {maxAge:0})

    res.status(204).json({message: 'Logout success!'})
}

// require signin 
exports.requireSignin = expressJWT({
    // if the token is valid, express jwt appends the verified users id
    // in an auth key to the request object

    secret : process.env.JWT_SECRET,
    algorithms: ['sha1', 'RS256', 'HS256'],
    userProperty: "auth"
})

