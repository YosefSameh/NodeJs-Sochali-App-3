
const Posts = require("../Modules/social.modules")
const Users = require("../Modules/users.modules")

const GetAllPosts = async(req,res)=>{

    const posts =  await Posts.find()
    res.status(200).json({status :"Suuhfle",data:{posts}})
}
const GetPost =async (req,res)=>{

    try{
        const post = await Posts.findById(req.params.idPosts)
        if(!post){
            return res.status(404).json({status:"Fail",data:{Massege:"Can Not Get This Id"}})
        }
    res.json({status:"Succfule",data:{post:post}})

    }
    catch(error){
        return res.status(404).json({status:"Error",data:{Massege:error}})
    }
}


const AddPost = async (req,res)=>{
    const {titel,createAt} = req.body
    const userId = req.user.id

    

    const user = await Users.findById(userId)
    // const img = req.file ? req.file.path : null;
    const img = req.file ? req.file.path : null;

    console.log(img,"img");
    
        const newPost = new Posts({
            titel,
            imgPost:img,
            createAt,
            user_id: userId,
            firstName:user.firstName,
            lastName:user.lastName,
            
        })

        if(!titel){
            return res.status(404).json({status:"Fail",data:{Massege:"Title Is Emty"}})
        }

        await newPost.save()
            const populate = await  newPost.populate("user_id","firstName lastName")
        res.json({status:"Succfule",data:{post:populate}})

}


const EditePost = async (req,res)=>{

    const idPosts = req.params.idPosts
    try{
        if(!idPosts){
            return res.status(404).json({status:"Fail",data:{Massege:"Can Not Get Id"}})
        }
        if(!req.body){
            return res.status(404).json({status:"Fail",data:{Massege:"body is Emty"}}) 
        }
        const PostAfterEdit = await Posts.updateOne({_id:idPosts},{$set:{...req.body}})
        const postEdit = await Posts.findById(idPosts)
        res.json({status:"Succfule",data:{post:postEdit}})
    
    }catch(error){
        return res.status(404).json({status:"Error",data:{Massege:error}})
    }
}


const DeletePost = async (req,res)=>{

    const idPost = req.params.idPosts

    const deletePost = await Posts.deleteOne({_id:idPost}) 

    res.json({status:"Succfule",data:{post:deletePost}})
}

module.exports = {
    GetAllPosts,
    GetPost,
    AddPost,
    EditePost,
    DeletePost
}