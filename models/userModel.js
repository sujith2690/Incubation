const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin:{
        type:Boolean,
        default:false

    },
    seenNotification:{
        type: Array,
        default:[]
    },
    unseenNotification:{
        type:Array,
        default:[]
    },
    status:{
        type:String,
        default:'Pending'
    }
    

}, {
    timestamps: true
})

const userModel = mongoose.model('users', userSchema);
module.exports = userModel
