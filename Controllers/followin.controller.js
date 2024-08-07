const Users = require("../Modules/users.modules");
const Posts = require("../Modules/social.modules");




const Following = async (req,res)=>{

    const userId = req.user.id
    const postId = req.params.idPosts

    
    try {
        const user = await Users.findById(userId);

        if (!user ) {
            return res.status(404).json({ status: 'Fail', data: { Message: 'User not found' } });
        }

            const post = await Posts.findById(postId)


             console.log(post,"psots");

            const followData = {
                firstName: post.firstName,
                lastName: post.lastName,
                postId:post._id
            }

            

            user.follow.push(followData);

            await user.save();
            res.json({ status: 'Successful', data: {follow:user.follow} });

}
    catch (error) {
        res.status(500).json({ status: 'Error', data: { Message: error.message } });
    }
} 






const UnFollowing = async (req,res)=>{

    const userId = req.user.id
    const followeId = req.params.idFollower

   try{
    const user = await Users.findById(userId)

    if (!user) {
        return res.status(404).json({ status: "fail", data: { message: "User not found" } });
    }

    const UnfollowIndex = user.follow.findIndex(follow => follow._id.toString() === followeId);

        // if (UnfollowIndex === -1) {
        //     return res.status(404).json({ status: "fail", data: { message: "Follow not found" } });
        // }

    user.follow.splice(UnfollowIndex,1)
    await user.save()

    res.json({ status: "successful", data: {user} });


   }
   catch(error){
    return res.status(404).json({ status: "fail", data: { message: error } });
   }

} 





module.exports = {
    Following,
    UnFollowing
}