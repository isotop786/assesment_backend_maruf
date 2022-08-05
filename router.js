const express = require("express");
const router = express.Router();


// controller
const {userSignup, userSignin,requireSignin,signout} = require('./controllers/auth.controller');
const {getProducts,createProduct,getSingleProduct, searchProduct} = require('./controllers/product.controller');
const {addProduct, removeProduct, getBucketItem} = require('./controllers/bucket.controller');


// validator
const {userSignupValidator} = require('./validators/')

// middleware
const {AuthMiddleware} = require('./middleware/auth.middleware')

// common routes
router.get('/',(req,res)=>{
    res.send('<h2>RS2 Assessment Backend</h2>'
    
    )
})


// auth routes
router.post('/auth/signup',userSignupValidator, userSignup);
router.post('/auth/signin', userSignin)
router.post('/auth/signout', signout)

// product routes
router.get('/products/',requireSignin,getProducts)
router.get('/products/:id/',requireSignin,getSingleProduct)
router.post('/products/',requireSignin,createProduct)
router.post('/products/search',requireSignin,searchProduct)

// bucket routes
router.get('/buckets/',requireSignin,getBucketItem)
router.post('/buckets/',requireSignin,addProduct)
router.delete('/buckets/:id',requireSignin,addProduct)












module.exports = router;