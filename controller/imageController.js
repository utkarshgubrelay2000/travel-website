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
        try {
            Images.findById(found[0]._id).then(foundImage=>{
                let image={url:req.body.url,
                    rating:req.body.rating,tourPlace:req.body.tourPlace}
                let array=foundImage.Images
                array.push(image)
                foundImage.Images=array
                console.log(foundImage,req.body.url)
                foundImage.save()
res.json('done')
            })
          
        } catch (error) {
            console.log(error)
        }
      
            }).catch(err=>{
        res.status(503).then(err)
    })
}
exports.deleteImage=(req,res)=>{
    Images.find({}).then(found=>{
        try {
            Images.findById(found[0]._id).then(foundImage=>{
                let newArray=[]
                foundImage.Images.map(item=>{
                    console.log(item.url,req.body.imageUrl,req.body)
                    if(item.url!==req.body.imageUrl)
                    {
                        newArray.push(item)
                    }
                })
                foundImage.Images=newArray
                foundImage.save()
res.json('done')
            })
          
        } catch (error) {
            console.log(error)
        }
      
            }).catch(err=>{
                res.status(503).json(err)
            })

}
exports.getAllImage=(req,res)=>{
    Images.find({}).then(found=>{
        //let latestImage=found[0].reverse()
  res.json(found[0])
    }).catch(err=>{
        res.status(503).json(err)
    })

}