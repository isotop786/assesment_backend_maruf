const {body} = require('express-validator')

exports.userSignupValidator = (req,res,next)=>{
    req.check('loginName', 'Login Name Can not empty').notEmpty();
    req.check('password','Password can not eb empty').notEmpty();

    // checking for errors
    const errors = req.validationErrors();

     // if error, show the  first one as happen
     if(errors){
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({error: firstError})
    }
    
    // proceed to the next middleware
    next();
}