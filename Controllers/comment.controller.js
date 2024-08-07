const Posts = require("../Modules/social.modules")
const Users = require("../Modules/users.modules")


const AddComment = async(req,res)=>{
    const {text} = req.body
    const user = req.user
    const postId = req.params.idPosts


    
    const newComment = {
        text, 
        user_id: user.id,
        createdAt: new Date(),
        firstName:user.firstName,
        lastName:user.lastName,
    }

    if (!text) {
        return res.status(400).json({ status: "fail", data: { message: "Comment text is empty" } });
    }
    const post = await Posts.findById(postId)
    
    if (!post) {
        return res.status(404).json({ status: "fail", data: { message: "Post not found" } });
    }


    post.comments.push(newComment)
     await post.save()
     res.json({ status: "successful", data: { post } });

}








const DeleteComment = async(req,res)=>{

    const idPost = req.params.idPosts
    const idComment = req.params.idComment

    try{

        const post = await Posts.findById(idPost)

        if(!post){
            return res.status(404).json({ status: "fail", data: { message: "Post not found" } });
        }

        const commentIndex = post.comments.findIndex(comment => comment._id.toString() === idComment);

        if (commentIndex === -1) {
            return res.status(404).json({ status: "fail", data: { message: "Comment not found" } });
        }

        post.comments.splice(commentIndex,1)

        await post.save();

        res.json({ status: "successful", data: { post } });

    }
    catch (error) {
        res.status(500).json({ status: "error", data: { message: error.message } });
    }



}








module.exports = {
    AddComment,
    DeleteComment
}