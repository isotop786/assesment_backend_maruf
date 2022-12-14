const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const bucketSchema = new mongoose.Schema({
    
    quantity:{
        type: Number,
        required: true,
        trim: true,
    },

    product:{
        type: mongoose.Schema.Types.ObjectId, // Foreign key, which repreasent Product
        ref: 'Product',
        required: true
    },

    user:{
        type: mongoose.Schema.Types.ObjectId, // Foreign key, which repreasent User
        ref:'User',
        required: true
    },

    created:{
        type:Date,
        default: Date.now,
    },

})


module.exports = mongoose.model("Bucket",bucketSchema)
