const Posts = require("../Modules/social.modules")


const GetUserPosts = async(req,res)=>{

    const userId = req.user.id
    try{

        const userPosts = await Posts.find({user_id:userId})
        res.status(200).json({status :"Suuhfle",data:{posts:userPosts}})
    }
    catch (error) {
        res.status(500).json({ status: "Error", data: { Message: error.message } });
    }


    
}




const GetProfilePosts = async(req,res)=>{

    const userId = req.params.userId

    try{

        const userPosts = await Posts.find({user_id:userId})
        res.status(200).json({ status: "Successful", data: { posts: userPosts } });
    }
    catch (error) {
        res.status(500).json({ status: "Error", data: { Message: error.message } });
    }

}




module.exports = {
    GetUserPosts,
    GetProfilePosts
}