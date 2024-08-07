const Posts = require("../Modules/social.modules");
const Users = require("../Modules/users.modules");



const SavePost = async (req,res)=>{

    const postId = req.params.idPosts
    const userId = req.user.id

    
        try {
            const user = await Users.findById(userId);
            if (!user) {
                return res.status(404).json({ status: "Fail", data: { Message: "User not found" } });
            }
    
            if (user.saved.includes(postId)) {
                return res.status(400).json({ status: "Fail", data: { Message: "Post already saved" } });
            }
            
            const post = await Posts.findById(postId)

            console.log(post,"Posts");
            
            const newPostSave = {
                postId:post._id,
                titel:post.titel,
                img:post.img,
                createAt:new Date(),
                firstName:post.firstName,
                lastName:post.lastName,
            }
            
            
            
            user.saved.push(newPostSave);
            await user.save();
            
            res.json({ status: "Successful", data: { saved: user.saved} });
        }
        catch (error) {
            res.status(500).json({ status: "Error", data: { Message: error.message } });
        }

}


const UnSave = async (req,res)=>{

    const userId = req.user.id
    const saveId = req.params.idSave


    try{
        const user = await Users.findById(userId)
    
    const Unsave =  user.saved.findIndex(save => save._id.toString() === saveId)

    // if(Unsave ===  0){
    //     return res.status(404).json({ status: "fail", data: { message: "Save not found" } });
    // }

    console.log(Unsave);
    
    
    user.saved.splice(Unsave,1)
    await user.save()
    res.json({ status: "successful", data: {user} });

    }catch(error){
        return res.status(404).json({ status: "fail", data: { message: error } });
    }

    
}


module.exports = {
    SavePost,
    UnSave
}