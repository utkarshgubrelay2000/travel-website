const Images = require('../model/ImageModel')

exports.addImage=(req,res)=>{
    let Image=new Images({
        Images:req.body.Images
    })
    Image.save().then(saved=>{
        res.json({msg: "Category Created"})
    }).catch(err=>{
        res.status(503).then(err)
    })
}
exports.postImages=(req,res)=>{
    Images.find({}).then(found=>{
found[0].Images=[...found[0].Images,...req.body.images]
res.json('done')
    }).catch(err=>{
        res.status(503).then(err)
    })
}