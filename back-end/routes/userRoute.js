const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const contactUser = require('../models/contactModel')
const {sendEmail} =require('./email')

router.post('/register', async (req, res) => {
    console.log("route hit to hua register wala");
    const { name, email, password } = req.body
    console.log("backend data ", name, email, password);
    const newUser = new User({
        name: name, email: email, password: password
    })
    try {
        await newUser.save()
        res.send("user created successfully")

    } catch (error) {
        return res.status(400).json({ message: error })
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    try {
        const foundUser = await User.findOne({ email: email, password: password })
        console.log("this is the found user", foundUser);
        if (foundUser) {

            const currentUser = {
                name: foundUser.name,
                email: foundUser.email,
                _id: foundUser._id,
                isAdmin: foundUser.isAdmin
            }
            console.log("this is the current user details    ", currentUser);
            res.send(currentUser)
        }
        else {
            console.log("kuch ni mila");
            return res.status(400).json({ message: "user loggedin failed" })
        }
    } catch (error) {
        return res.status(400).json({ message: error })
    }
})

router.post('/senderdetail', async (req, res) => {

    console.log("contact user backend route hit hua");
    const { name, email, subject, message } = req.body
    const newUser = new contactUser({
        name: name, email: email, subject: subject, message: message
    })
    try {
        await newUser.save()

        // res.send("contactUser created successfully")
        try {
            
            sendEmail(message,name,email,subject);
            res.send("email send successcully");
        } catch (error) {
            
            res.send("Please provide a valid email address !");
        }

    } catch (error) {
        return res.status(400).json({ message: error })
    }

})

module.exports = router;