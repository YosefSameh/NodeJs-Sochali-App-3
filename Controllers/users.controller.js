
const Users = require("../Modules/users.modules")
const bcrupt = require("bcryptjs")
const JWT = require("jsonwebtoken")

const GetAllUsers = async (req,res)=>{
    const users = await Users.find()
    res.json({status:"Sucsfule",data:{Users:users}})
}
const GetUser = async (req,res)=>{

    if (!req.params.idUsers) {
            return res.status(404).json({status:"Fail",data:{Massege:"Can Not Get Id"}})
    }
    const user = await Users.findById(req.params.idUsers)

    res.json({status:"Sucsfule",data:{Users:user}})
}


const Rigster = async (req,res)=>{

   const {firstName,lastName,email,password} = req.body

    const hashingPassword = await bcrupt.hash(password,10)

    if(!email && !password){
     return res.status(404).json({status:"Fale",data:{Massege:"Emali And Password Is Require"}})
 }
   const userNew = new Users({
    firstName,
    lastName,
    email,
    password:hashingPassword
   }) 
   const token = await JWT.sign({email:userNew.email,id:userNew._id,firstName:userNew.firstName,lastName:userNew.lastName},process.env.JWTSECRYT)
   userNew.token = token
   await userNew.save()

    res.status(201).json({status:"Sucsfule",data:{Users:userNew}})

}


const Login = async (req,res)=>{

    const {email,password} = req.body

    if(!email && !password){
         return res.status(404).json({status:"Fale",data:{Massege:"Emali And Password Is Require"}})
    }
        const user = await Users.findOne({email:email})

       
        if(!user){
            return res.status(404).json({status :"fail",data:"User Not Found"})
        }

        const unHachingPassword = await bcrupt.compare(password,user.password) 
        if(user && unHachingPassword){
            const token = await JWT.sign({email:user.email,id:user._id,firstName:user.firstName},process.env.JWTSECRYT)
            res.status(200).json({status:"Sucsfule",data:{Users:user}})
        }else{
            return res.status(404).json({status :"fail",data:"Somthing Error"})
        }
        
}



module.exports = {
    GetAllUsers,
    GetUser,
    Rigster,
    Login
}