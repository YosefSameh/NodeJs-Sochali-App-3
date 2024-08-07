const express = require("express");
const { GetUserPosts, GetProfilePosts } = require("../Controllers/profile.controller");
const route = express.Router()
route.use(express.json())
const tokenCheck = require("../Middlewares/tokenCheck")



route.route("/")
    .get(tokenCheck, GetUserPosts);


route.route("/:userId")
    .get(GetProfilePosts);



    module.exports = route