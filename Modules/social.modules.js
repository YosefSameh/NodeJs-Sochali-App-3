const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema({
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    text: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    firstName:{
      type: String,
    },
    lastName:{
      type: String,
      
    }
  });



const SocialSchema = new  mongoose.Schema({
    titel:{
        type:String,
        required:true
    },
    imgPost:{
        type:String,
    },
    createAt:{
        required:true,
        type:Date,
        default:Date.now
    },
    firstName:{
        required:true,
        type:String
    },
    lastName:{
        required:true,
        type:String
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments:[CommentSchema],
    
})

module.exports = mongoose.model("Post",SocialSchema)