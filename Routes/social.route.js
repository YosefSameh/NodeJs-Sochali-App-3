const express = require("express")
const route = express.Router()
route.use(express.json())

const {GetAllPosts,GetPost,AddPost,EditePost,DeletePost} = require("../Controllers/social.controller")
const tokenCheck = require("../Middlewares/tokenCheck")
const { AddComment, DeleteComment } = require("../Controllers/comment.controller")
const upload = require("../Middlewares/upload")

route.route("/")
.get(GetAllPosts)
.post(tokenCheck ,upload.single('imgPost'),AddPost)


route.route("/:idPosts")
.get(GetPost)
.patch(tokenCheck,EditePost)
.delete(tokenCheck,DeletePost)



route.route("/:idPosts/comments")
    .post(tokenCheck,AddComment)



route.route("/:idPosts/comments/:idComment")
    .delete(tokenCheck,DeleteComment)





module.exports = route