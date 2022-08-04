const express = require('express')
const app = express();
const mongoose = require('mongoose')
const morgan = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
dotenv.config();
const router = require('./router')
const expressValidator = require('express-validator')
const cors = require('cors')
const cookieParser = require('cookie-parser')
// app.use(cors({credentials:true, origin:true}))
// app.options('*',cors())

const corsConfig = {
    origin: true,
    credentials: true,
  };
app.use(cors(corsConfig));
app.options('*', cors(corsConfig));



const connectDB = require('./db')

// db 
connectDB();

// middleware
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(expressValidator())

// app.use(expressValidator)




// routes
app.use('/',router)

// connection
const PORT = process.env.PORT || 5200;

app.listen(PORT,()=> console.log(`Server is running on port ${PORT}`))


