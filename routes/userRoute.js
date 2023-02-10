const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middlewares/authMiddleware')
const Applyincub = require('../models/applyIncubModel')

router.post('/signup', async (req, res) => {
    try {
        const userExist = await User.findOne({ email: req.body.email })
        if (userExist) {
            res.status(200).send({ message: 'User already exist', succsess: false })

        }
        else {
            const password = req.body.password
            const salt = await bcrypt.genSalt(10)
            const hashpassword = await bcrypt.hash(password, salt)
            req.body.password = hashpassword;
            const newUser = new User(req.body);
            await newUser.save();
            res.status(200).send({ message: 'user created successfully', success: true })
        }

    } catch (error) {
        res.status(500).send({ message: 'user creation error', success: false, error })
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(200).send({ message: "user doesnot exist", sucsess: false })
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if (!isMatch) {
            return res.status(200).send({ message: 'password is incorrect', success: false })
        }
        else {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
           
            res.status(200).send({ message: 'Login success', success: true, data: token })
        }

    } catch (error) {
        res.status(500).send({ message: 'Error in login', success: false, error })

    }
})

router.post('/get-userinfo-by-id', authMiddleware, async(req,res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId })
        user.password = undefined
        // console.log(user,'user at userRoute')
        
        
        if (!user) {
            return res.status(200).send({ message: 'User doesnot exist', success: false })
            
        }
        else {
            res.status(200).send({ success: true, data: user })
            // console.log(user,'user at userRoute2')
        }

    } catch (error) {
        res.status(500).send({ message: 'Error geting user info', success: false, error })
    }
})

router.post('/apply-incubation',authMiddleware, async (req,res) => {
    try {
        console.log('....................tryblock  555.....')

       const newApplication = new Applyincub(req.body)
       await newApplication.save()
       const adminuser = await User.findOne({isAdmin:true})
       
       const unseenNotification = adminuser.unseenNotification
       unseenNotification.push({
        type:'new-incubation-application',
        message:`${newApplication.name} has applied for incubation`,
        data:{
            userId : newApplication._id,
            name: newApplication.name,
            companyname:newApplication.companyname,
        },
        onclickPath : '/admin/Applications'
       })
       await User.findByIdAndUpdate(adminuser._id, {unseenNotification});
       res.status(200).send({
        success:true,
        message:'Successfully applied for incubation'
       })
    } catch (error) {
        res.status(500).send({ message: 'Error in application', success: false, error })
    }
})
router.post('/delete-all-notification',authMiddleware, async (req,res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId });
       
        user.unseenNotification = []
        user.seenNotification = []
        const updatedUser = await user.save()
        updatedUser.password = undefined
        
        res.status(200).send({ success: true,message:'All notifications deleted', data: updatedUser })

    } catch (error) {
        res.status(500).send({ message: 'Error in deleting notifications', success: false, error })
    }
})
router.post('/mark-all-notification-seen',authMiddleware, async (req,res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId });
        console.log(user,'user at mark notification seen')
        const seenNotification = user.seenNotification;
        const unseenNotification = user.unseenNotification;
        seenNotification.push(...unseenNotification)
        user.seenNotification = seenNotification
        user.unseenNotification = []
        const updatedUser = await user.save()
        updatedUser.password = undefined
        
        res.status(200).send({ success: true,message:'All notifications marked as seen', data: updatedUser })

    } catch (error) {
        res.status(500).send({ message: 'Error in marking all notification seen', success: false, error })
    }
})

module.exports = router