const express = require("express")
const tokenCheck = require("../Middlewares/tokenCheck")
const { GetAllUsers,GetUser,Rigster,Login } = require("../Controllers/users.controller")
const { SavePost, UnSave } = require("../Controllers/save.controller")
const route = express.Router()
route.use(express.json())



route.route("/")
.get(GetAllUsers)
route.route("/:idUsers")
.get(GetUser)


route.route("/rigster")
.post(Rigster)

route.route("/login")
.post(Login)


route.route("/:idPosts/save")
    .post(tokenCheck,SavePost)


route.route("/:idSave/unsave")
    .post(tokenCheck,UnSave)


module.exports = route
