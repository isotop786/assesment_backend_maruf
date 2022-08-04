const mongoose = require('mongoose')
const dotenv = require('dotenv')

const connectDB =()=>{
    // db 
    mongoose.connect(process.env.MONGO_URI)
    .then(()=> console.log(`Database connnected `))

    mongoose.connection.on('error', err=>{
        console.log(err);
    })
}


module.exports = connectDB;