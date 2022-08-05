const Product = require('../models/product.model')


exports.createProduct =   (req,res)=>{
    const product = new Product({
        name: req.body.name,
        type: req.body.type,
        description: req.body.description,
        image: req.body.image
    })

    product.save().then(result =>{
        res.status(201).json({
            result
        })
    })
}

exports.getProducts = (req,res) =>{
    try{
        const products = Product.find()
        .sort({created: -1})
        .then(product=> {
            res.status(200).json({
                product
            })
        })
        .catch(err=>{
            console.log("product creation err is: "+err);
            res.status(500).json({
                err
            })
        })
    }
    catch(err)
    {
        console.log(e);
        res.status(500).json({ message: "Error Occured",error: e });
    }
}

exports.getSingleProduct = (req,res) =>{
    try{

        const id = req.params.id
        
        Product.find({_id:id})
        .then(product=> {
            res.status(200).json({
                product
            })
        })
        .catch(err=>{
            console.log("product creation err is: "+err);
            res.status(500).json({
                err
            })
        })


    }catch(err){
        console.log(" error is: "+err);
        res.status(500).json({
            err
        })
    }
}

exports.searchProduct = async  (req,res) =>{
    
    const type = req.query.type;
    const name = req.query.name.replace('%20',' ');

    try{

        const products = await Product.find({type: new RegExp('.*'+type), name: new RegExp('.*'+name) })
        .sort({created: -1})
        .then(product =>{
            res.status(200).json({
                product
            })
        })
        .catch(error=> {
            console.log(error)
            res.status(500).json({
                error: error
            })
        })


    }catch(err){
        console.log(error)
            res.status(500).json({
                error: error
            })
    }

    
    
}