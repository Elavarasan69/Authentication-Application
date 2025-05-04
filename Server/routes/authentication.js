const express = require('express')
const UserData = require('../models/User')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//register
router.post('/register', async (req, res) => {

    const user = await UserData.findOne({ email: req.body.email })
    if (!user) {
        //creating salt and hash password value
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const user = new UserData({
            email: req.body.email,
            password: hashedPassword
        })
        await user.save()
        try {
            res.json({
                status: 200,
                message: "Account created successfully!"
            })
        }
        catch (error) {
            res.json({
                status: 401,
                message: error.message
            })
        }
    }
    else {
        res.json({
            message: "User already exists"
        })
    }

})

//login
router.post('/login', async (req, res) => {

    const user = await UserData.findOne({ email: req.body.email })
    if (!user) return res.json("User does not exist")

    const matchPassword = await bcrypt.compare(req.body.password, user.password)
    if (!matchPassword) return res.json("Incorrect password")

    const accessToken = jwt.sign({ _id: user._id }, process.env.SECRET_KEY)
    user.password = undefined
    res.json({
        body: {
            message: "Access granted",
            user: user,
            access_token: accessToken
        }
    })
})

module.exports = router