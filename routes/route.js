const express = require("express")
const router = express.Router();
const adMemController = require("../controller/adMemController");
const app =express();
const cors = require("cors");
app.use(cors());

// const jwt = require("jsonwebtoken");

// const jwtAuth = (req,res,next)=>{
//     var token = req.headers.authorization;
//     token = token.split(" ")[1];
//     jwt.verify(token,'Admin-Member',function(error,decoded){
//         if(error) { return res.status(400).send({status:false,msg:"invalid token"})}
//         next();
//     })
// }

const passport=require('passport');
require('../config/passport')(passport)
router.get("/",function(req,res){
    res.send("running")
})

// router.get('/list', passport.authenticate('jwt',{session:false}).adMemController.getList)
router.post("/createAdMem",adMemController.createAdMem);

router.post("/adMemLogin",adMemController.adMemLogin)


module.exports=router