const category = require("../model/categoryModel")
exports.postCategory=(req,res)=>{
    const {categoryName,thumbImage}=req.body
    console.log('hhh')
    category.findOne({categoryName:categoryName}).then(foundCategory=>{
        if(foundCategory){
            res.status(409).json({error:' Category with this name Already Exists '})
        }
        else{
            let newCategory=new category({
                categoryName:categoryName,
                thumbImage:thumbImage
            })
            newCategory.save().then(saved=>{
                res.json({msg: "Category Created"})
            })
        }
    }).catch(err=>{
        res.status(503).json("something went wrong")
    })
}
exports.updateCategory=(req,res)=>{
    const {categoryId,categoryName,thumbImage}=req.body
    category.findById(categoryId).then(foundCategory=>{
if(foundCategory){
    category.findOneAndUpdate({_id:categoryId},{categoryName:categoryName,thumbImage:thumbImage}).then(changedCategory=>{
        res.json({message:'Category Updated'})
    })
}
else{
    res.status(404).json('category not found')
}
    }).catch(err=>{
        res.status(503).json("something went wrong")
    })
}
exports.getAllCategories=(req,res)=>{
    category.find({}).sort({_id:-1}).then(foundCategories=>{
        res.json(foundCategories)
    }).catch(err=>{
        res.status(503).json("Something went wrong")
    })
}
exports.deleteCategory=(req,res)=>{
    category.findByIdAndDelete(req.params.categoryId).then(deleted=>{
        res.json('Deleted Successfully')
    }).catch(err=>{
        res.status(503).json("Something went wrong")
    })
}
exports.getCategoryById=(req,res)=>{
    category.findById(req.params.id).then(foundCategories=>{
        res.json(foundCategories)
    }).catch(err=>{
        res.status(503).json("Something went wrong")
    })
}