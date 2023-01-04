const express = require("express")
const bodyParser = require("body-parser")
const route = require("./routes/route");
const app = express();
const passport = require('passport')
const cors = require("cors");
app.use(cors());

app.use(passport.initialize());

const mongoose = require("mongoose");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect("mongodb+srv://shiva:ZxJf1KONMThYSpCU@cluster0.yuxls.mongodb.net/RECOVERO",{
    useNewUrlParser:true,
})
.then(()=>{
    console.log("Db isconnected")
})
.catch(err=>{
    console.log("error",err)
})

app.use("/",route);

app.listen(process.env.PORT||3020, function(req,res){
    console.log(`Express is connected on port `+(process.env.PORT||3020))
})