const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    type:{
        type: String,
        required: [true, 'Please provide type'],
        enum:{
           values:['book','music','game'],
           message:'{VALUE} is not supported' 
        },
        trim: true,  
    },

    description:{
        type: String,
        trim: true,
    },

    image:{
        type: String, 
        required: false,
    },

    created:{
        type:Date,
        default: Date.now,
    },

})

module.exports = mongoose.model("Product",productSchema)
