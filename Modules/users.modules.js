const mongoose = require("mongoose")
const validator = require("validatorjs")

const FollowingSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    postId:{
        type:String,
    }
})

const SavedSchema = new mongoose.Schema({
    titel:{
        type:String,
        required:true
    },
    img:{
        type:String,
        
    },
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    comments:{
        type:String,
        
    },
    createAt:{
        required:true,
        type:Date,
        default:Date.now
    },
    postId:{
        type:String, 
    }
    
})

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate: {
            validator: function(v) {
                const validation = new validator({ email: v }, { email: 'required|email' });
                return validation.passes();
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String,
    },
    saved:[SavedSchema],
    follow:[FollowingSchema],
})


module.exports = mongoose.model("User",userSchema)