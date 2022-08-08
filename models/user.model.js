const mongoose = require('mongoose');
const {v4: uuidv4} = require('uuid');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    loginName:{
        type: String,
        required: true,
        trim:true,
        unique: true // `loginName` must be unique
    },

    hashed_password:{
        type:String,
        required:true,
        trim:true,
    },

    salt: String,

    created:{
        type:Date,
        default: Date.now,
    },

})

// virtuals 
userSchema.virtual('password')
.set(function(password){
    this._password = password

    // generate salt
    this.salt = uuidv4();

    // encrypt password 
    this.hashed_password = this.encryptPassword(password);

})
.get(function(){
    return this._password;
})


// methods

userSchema.methods = {
    // authenticate user 
    authenticate: function(text){
        return this.encryptPassword(text) === this.hashed_password;
    },

    // encrypt password
    encryptPassword : function(password){
        // first check if password is set
        if(!password) return "";

        // if password is set, then proceed further
        try{
            return crypto.createHmac('sha1', this.salt)
            .update(password)
            .digest('hex'); 


        }catch(err){
            console.log(err)
            return "";
        }
    }

}



module.exports = mongoose.model("User",userSchema)