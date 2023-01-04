// const connection =require("../config/db")
const mongoose = require("mongoose")
mongoose.set('strictQuery', true);
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
let secret = 'fgjgjghfhghghghgjhhghgjru57867868676ugjgjhghtut76767'

const adMemSchema=new mongoose.Schema({
    name:{type:String, require:true},
    lname:{type:String, require:true},
    email:{type:String, require:true,unique:true},
    phone:{type:Number, require:true,unique:true},
    password:{type:String,require:true},
    confirmPassword:{type:String,require:true},
    tokens:[
        {
            token:{type:String,require:true}
        }
    ]
},{timestamps:true});

adMemSchema.pre('save',function(next){
    const salt = bcrypt.genSaltSync(10);
    if(this.password && this.isModified('password')){
        this.password = bcrypt.hashSync(this.password,salt)
    }
    next();
})

adMemSchema.methods.getAuthToken = async function(data){
    let params={
        email:this.email,
        phoneNumber:this.phoneNumber
    }
    console.log(params)
    const tokenValue =jwt.sign(params,secret);
    this.tokens = this.tokens.concat({token:tokenValue});
    console.log("token",tokenValue)
    await this.create();
    return tokenValue;

}


const adMem = new mongoose.model("Admin_Member",adMemSchema);
module.exports=adMem;