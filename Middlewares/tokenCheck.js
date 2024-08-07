const Jwt = require("jsonwebtoken")


const tokenCheck = (req,res,next)=>{

    const AuthHeaders =  req.headers["Authorization"] || req.headers["authorization"]

    if(!AuthHeaders){
        return  res.status(404).json({status :"fail",data:{Massege:"Token is Require"}})
    }
    try{
        const token = AuthHeaders.split(" ")[1]

        const unHachingToken = Jwt.verify(token,process.env.JWTSECRYT,(err,user)=>{
            req.user = user
            next()
        })
        req.unHachingToken = unHachingToken
        
    }catch(error){
        res.status(404).json({status :"fail",data:{Massege:error}})
    }

}

module.exports = tokenCheck