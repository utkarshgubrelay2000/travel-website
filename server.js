var express = require('express');
const app=express()
const path=require('path')
const cors = require("cors")
const mongoose=require('mongoose')
require("dotenv").config({path:"./config/config.env"});
const bodyParser = require('body-parser');
var authRouter = require('./routes/Auth');
var categoryRouter = require('./routes/category');
var AdRouter = require('./routes/Ad');
var couponRouter = require('./routes/coupon');
var homeBannerRouter = require('./routes/homeBanner');
var userRouter = require('./routes/user');





mongoose.connect(process.env.MONGO_URL,{
  useNewUrlParser:true,
  useUnifiedTopology:true
});
app.use(express.static(path.join(__dirname, 'public')));
mongoose.connection.on("connected", () => {
console.log("connected to mongo yeah !");
});
mongoose.connection.on("error",()=>{
  console.log("error connecting to mongo " ,)
}).catch(err =>{
console.log("error is",err)
})


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())

///Router
/// Server check
app.get('/', function(req, res, next) {
  res.send('Welcome to Udemy');
});
// Auth Routers
app.use('/',authRouter)
 app.use('/',categoryRouter)
 app.use('/',AdRouter)
// app.use('/',homeBannerRouter)
// app.use('/',couponRouter)
// app.use('/',userRouter)






app.listen(process.env.PORT, () => {
  console.log("running on PORT ",process.env.PORT);
});

module.exports = app;
