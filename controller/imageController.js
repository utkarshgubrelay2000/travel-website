const Images = require('../model/ImageModel')

exports.addImage=(req,res)=>{
    let image={url:req.body.url,rating:req.body.rating,tourPlace:req.body.tourPlace}
    let Image=new Images({
        Images:image
    })
    Image.save().then(saved=>{
        res.json({msg: "Category Created"})
    }).catch(err=>{
        res.status(503).then(err)
    })
}
exports.postImages=(req,res)=>{
    Images.find({}).then(found=>{
        let image={url:req.body.url,rating:req.body.rating,tourPlace:req.body.tourPlace}
found[0].Images=[...found[0].Images,...images]
res.json('done')
    }).catch(err=>{
        res.status(503).then(err)
    })
}
exports.deleteImage=(req,res)=>{
    Images.find({}).then(found=>{
        let newArray=[]
        found.Images.map(item=>{
            if(item.url!==req.body.imageUrl)
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