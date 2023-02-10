const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const Applyincub = require('../models/applyIncubModel')
const authMiddleware = require('../middlewares/authMiddleware')


router.get('/get-all-users',authMiddleware, async (req,res) => {
    try {
        const user = await User.find({isAdmin:false});

        res.status(200).send({ success: true,message:'fetched all users successfully ', data: user })

    } catch (error) {
        res.status(500).send({ message: 'Error in fetchig all users', success: false, error })
    }
}) 
router.get('/get-all-applications',authMiddleware, async (req,res) => {
    try {
        const applications = await Applyincub.find({status:"Pending"});
        // console.log(applications, 'applications at adminroute........')

        res.status(200).send({ success: true,message:'fetched all incubation applications ', data: applications })

    } catch (error) {
        res.status(500).send({ message: 'Error in fetchig all incub applications', success: false, error })
    }
}) 
router.get('/get-approved-applications',authMiddleware, async (req,res) => {
    try {
        const approvedapp = await Applyincub.find({status:"Approved"});
        // console.log(approvedapp, 'applications at adminroute........')

        res.status(200).send({ success: true,message:'fetched all Approved incubation applications ', data: approvedapp })

    } catch (error) {
        res.status(500).send({ message: 'Error in fetchig all approved incub applications', success: false, error })
    }
}) 
router.post('/change-application-status',authMiddleware, async (req,res) => {
    try {
        const {applicationId, status, usersId} = req.body
        

        const application = await Applyincub.findByIdAndUpdate(applicationId,{status});

        const user = await User.findOne({_id:usersId})

        
        const unseenNotification = user.unseenNotification
       unseenNotification.push({
        type:'Incubation-requrest-changed',
        message:`Your Incubation application is ${status} , Your Slot will be alloted winthin 24 hours`,
        onclickPath : '/notifications'
       })
       await User.findByIdAndUpdate(user._id, {unseenNotification});

       res.status(200).send({ success: true,message:'Application status updated successfully ', data: application })
      

    } catch (error) {
        res.status(500).send({ message: 'Error in fetchig all approved incub applications', success: false, error })
    }
}) 

router.post('/single-application',authMiddleware, async (req,res) => {
    try {
        const{applicationId} = req.body
        const singleapp = await Applyincub.find({_id:applicationId});
        console.log(singleapp, 'single app applications at adminroute........')

        res.status(200).send({ success: true,message:'fetched all Approved incubation applications ', data: singleapp })

    } catch (error) {
        res.status(500).send({ message: 'Error in fetchig all approved incub applications', success: false, error })
    }
}) 

router.get('/get-all-unslot-applications',authMiddleware, async (req,res) => {
    try {
        const applications = await Applyincub.find({status:"Approved"});
        // console.log(applications, 'applications at adminroute........')

        res.status(200).send({ success: true,message:'fetched all approved unsloated incubation applications ', data: applications })

    } catch (error) {
        res.status(500).send({ message: 'Error in fetchig all incub applications', success: false, error })
    }
}) 

module.exports = router