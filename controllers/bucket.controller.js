const Bucket = require('../models/bucket.model')

exports.addProduct = async (req,res) =>{

    const productExists = await Bucket.findOne({product: req.body.product})
    if(productExists){
        return res.status(403).json({
            error:'Product already added'
        });
    }

    const bucket = new Bucket({
        quantity: req.body.quantity,
        product: req.body.product,
        user: req["user"],
    })

    bucket.save().then(result =>{
        res.status(201).json({
            result
        })
    })
}

exports.removeProduct = async (req,res)=>{
    const id = req.query.id;

    const item = await Bucket.findOne({_id: id})

    if(item){
        Bucket.find({_id:id}).remove((err,product)=>{
            if(err){
                return res.status(400).json({
                    error: err
                })
            }
    
            return res.status(200).json({
                message:"Item has removed from bucket."
            })
    
        })
    
    }else{
        return res.status(400).json({
            error:'Item Not Found'
        })
    }
}

exports.getBucketItem = (req,res) =>{
    try{
        const items = Bucket.find()
        .sort({created: -1})
        .then(item=> {
            res.status(200).json({
                item
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
