const mongoose = require('mongoose')

const slotSchema = new mongoose.Schema({
    companyname: {
        type: String,
        required: true
    },
    status:{
        type:String,
        default:'Pending'
    },
    userId:{
        type:String,
        required:true
    },
    applicationId:{
        type:String,
        required:true
    }
    
}, {
    timestamps: true
})

const slotModal = mongoose.model('slots', slotSchema);
module.exports = slotModal
