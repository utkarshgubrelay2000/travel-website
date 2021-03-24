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
exports.deleteImage=(req,res)=>{
    Images.find({}).then(found=>{
        let newArray=[]
        found.Images.map(item=>{
            if(item!==req.body.imageUrl)
            {
newArray.push(item)
            }
        })
        found.Images=newArray
        found.save()
        res.json('done')
            }).catch(err=>{
                res.status(503).then(err)
            })

}