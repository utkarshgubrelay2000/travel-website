const order=require('../model/orderModel')

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
          {
            $lookup: {
              from: "courses",
              localField: "course.courseId",
              foreignField: "_id",
              as: "Course",
            },
          },
        {$group:{_id:{'confirmPayment':'$confirmPayment','userId':'$userId'},userOrders:{$push:'$$ROOT'}}},
        {$sort:{_id:-1}}
    ]).then(orders=>{
        res.json(orders)
    }).catch(err=>{
        res.status(404).json('my order')
    })
}