const customers = require('../model/customerModel')
const order=require('../model/orderModel')
const blog=require('../model/blogModel')
const Ad=require('../model/adModel')

exports.getOrders=(req,res)=>{
    order.aggregate([
        {
            $lookup: {
              from: "users",
              localField: "userId",
              foreignField: "_id",
              as: "userDetails",
            },
          },
        {$sort:{_id:-1}}
    ]).then(orders=>{
        res.json(orders)
    }).catch(err=>{
        res.status(404).json('my order')
    })
}
exports.getAllUser=(req,res)=>{
  customers.find({}).then(found=>{
    res.json(found)
  }).catch(err=>{
    res.status(404).json(err)
})
}
exports.allData=(req,res)=>{
customers.find({}).then(foundCus=>{
  blog.find({}).then(foundBlog=>{
    Ad.find({}).then(foundAd=>{
      Ad.find({}).then(foundOrder=>{
        
        res.json({ad:foundAd.length,blog:foundBlog.length,order:foundOrder.length,users:foundCus.length})
      })
    })
  })
}).catch(err=>{
  res.status(503).json("Something went wrong")
})
}