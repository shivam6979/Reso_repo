const adMemModel = require("../model/adMemModel");
const bcrypt = require('bcrypt')

const getList =async (req,res)=>{
    const data = await adMemModel.find();
    return res.status(200).send({status:true, msg:data})
}

module.exports.getList=getList;


const createAdMem = async (req,res)=>{
    try{
        const data = req.body;  //tokens
        const {name, lname, email, phone, password, confirmPassword}=data
        if(!data) return res.status(400).send({status:false,msg:'please provide details'});
        if(!name) return res.status(400).send({status:false,msg:'please provide name'});
        if(!lname) return res.status(400).send({status:false,msg:'please provide lname'});
        if(!email) return res.status(400).send({status:false,msg:'please provide email'});
        if(!phone) return res.status(400).send({status:false,msg:'please provide phone'});
        let data1 = await adMemModel.findOne({email:email,phone:phone})
        if(data1) { return res.status(400).send({status:false,msg:'emailid and phone number already exits'})}
        if(!password) return res.status(400).send({status:false,msg:'please provide password'});
        if(!confirmPassword) return res.status(400).send({status:false,msg:'please provide confirmPassword'});
        if(password !==confirmPassword) return res.status(400).send({status:false,msg:"password and confirmPassword doesn't match"});

        // if(!tokens) return res.status(400).send({status:false,msg:'please provide tokens'});
        const AdMemCreated = await adMemModel.create(data);
        // const myToken = await data.getAuthToken();
        // console.log("myToken controller",myToken)
        return res.status(200).send({status:true, msg:AdMemCreated})

    }catch(e){
        return res.status(500).send({status:false,msg:'create server error'})
    }
}
module.exports.createAdMem=createAdMem



const adMemLogin= async (req,res)=>{
    try{
        if(!req.body.email || !req.body.password){ return res.status(400).send({status:false, msg:'please enter required fields'})}

    const adMem = await adMemModel.findOne({email:req.body.email})
    if(!adMem) { return res.status(400).send({status:false,msg:"email not found"})}

    const match = await bcrypt.compare(req.body.password,adMem.password)
    if(!match) {return res.status(400).send({status:false,msg:'Password is incorrect'})}

    // console.log(adMem)
        res.status(200).send({status:true, msg:'Login successful'})
}
    catch(e){
        res.status(500).send({status:false,msg:'server error'})
    }
}

module.exports.adMemLogin=adMemLogin

