const express = require("express");
const route = express.Router()
route.use(express.json())
const tokenCheck = require("../Middlewares/tokenCheck");
const { Following, UnFollowing } = require("../Controllers/followin.controller");



route.route("/:idPosts")
    .post(tokenCheck,Following);

route.route("/unfollow/:idFollower")
    .post(tokenCheck,UnFollowing);



    module.exports = route