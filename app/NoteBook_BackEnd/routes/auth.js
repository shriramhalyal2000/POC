const User = require('../models/User');
const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
var nodemailer = require('nodemailer');


//create user endpoint 
router.post('/createuser', [
    //validating entries using express-validator package
    body('name', 'Name should be atleast 3 characters').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {

    // If there are errors, return Bad request and the errors
    let signedup = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array(), signedup });
    }
    // Check whether a user with this email id already exists in db 
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: [{ msg: "This Email is already Registered" }], signedup })
        }
        //hashing password for security 
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt)
        user = await User.create({
            name: req.body.name,
            password: password,
            email: req.body.email,
        })
        //appending user id with jwt_secret to create a unique token 
        const data = {
            user: {
                id: user.id
            }
        }
        signedup = true;
        const token = jwt.sign(data, process.env.JWT_SECRET)
        res.json({ token, signedup })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured,Please try again after some time", signedup);
    }


})



//Login endpoint 
router.post('/login', [
    //validating entries using express-validator package
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Please enter Password').exists()
], async (req, res) => {
    let login = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please Enter valid Credentials!!", login });
        }
        const passwordmatch = await bcrypt.compare(password, user.password);
        if (!passwordmatch) {
            return res.status(400).json({ error: "Please Enter valid Credentials!!", login })
        }
        //appending user id with jwt_secret to create a unique token 
        const data = {
            user: {
                id: user.id
            }
        }
        const token = jwt.sign(data, process.env.JWT_SECRET)
        login = true;
        res.status(201).json({ token, login })


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured,Please try again after some time");
    }

})



//get user details endpoint 
router.post('/getuser', fetchuser, async (req, res) => {

    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")//-password -> except password, it selects all the values
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.post('/forgotpassword', async (req, res) => {
    const { email } = req.body;
    let isEmailSent = false;
    try {
        const user = await User.findOne({ email }).then(user => {
            if (!user) {
                return res.status(400).json({ error: 'User with this email does not exist' })
            }
            else {
                return user
            }
        })
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_FROM,
                pass: process.env.EMAIL_PWD
            }
        })

        var mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Reset your password',
            text: `click on this link to rest your password - https://notebook-tcxm.onrender.com/reset-password/${user._id}/${token}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.status(404).json({ error: "Error sending email", isEmailSent });
            } else {
                isEmailSent = true;
                res.status(200).json({ message: 'Password reset link sent to your email', isEmailSent });
            }
        });

    } catch (error) {
        res.status(500).send(error.message);
    }
});


router.post('/resetpassword/:id/:token', async (req, res) => {
    const { newPassword } = req.body;
    const { id, token } = req.params;
    let isPasswordReset = false;
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(400).json({ error: 'Invalid token' })
        } else {
            bcrypt.hash(newPassword, 10)
                .then(hash => {
                    User.findByIdAndUpdate(id, { password: hash })
                        .then(() => {
                            isPasswordReset = true;
                            res.status(200).json({ message: 'Password reset successful', isPasswordReset })
                        }).catch(err => res.status(400).json({ error: 'Error updating password' }))
                })
                .catch(err => res.status(400).json({ error: 'Error updating password', isPasswordReset }))
        }
    }
    )
})



module.exports = router