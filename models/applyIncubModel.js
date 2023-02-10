const mongoose = require('mongoose')
const incubSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    companyname: {
        type: String,
        required: true
    },
    products: {
        type: String,
        required: true
    },
    problem: {
        type: String,
        required: true
    },
    solution: {
        type: String,
        required: true
    },
    competitors: {
        type: String,
        required: true
    },
    revenuemodel: {
        type: String,
        required: true
    },
    incubtype: {
        type: String,
        required: true
    },
    status:{
        type:String,
        default:'Pending'
    }
})
const applyIncubModel = mongoose.model('applyincub', incubSchema);
module.exports = applyIncubModel