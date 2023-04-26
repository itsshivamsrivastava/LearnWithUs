const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "shivamisagoo$dboy";

// Route 1: Create a new user using: POST "/api/auth/createuser". Doesn't require auth
router.post('/createuser', [
    body('fullname', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('phone', 'Enter a valid phone number').isLength({ min: 10 }),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
    body('confirmPassword', 'Password must be atleast 5 characters').isLength({ min: 5 }),
    body('gender', 'Please filled the correct details').isLength({ min: 4 }),

], async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ error: "User already exists" });
    }

    // Create a new user
    const fullName = req.body.fullname;
    const profileHeadline = req.body.profileHeadline;
    const gender = req.body.gender;
    const phone = req.body.phone;
    const secureEmail = req.body.email;
    const salt = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(req.body.password, salt);
    const confirmPassword = await bcrypt.hash(req.body.confirmPassword, salt);
    const profilePhoto = req.body.profilePhoto;
    user = await new User(
        {
            fullname: fullName,
            profileHeadline: profileHeadline,
            gender: gender,
            phone: phone,
            email: secureEmail,
            password: securePassword,
            confirmPassword: confirmPassword,
            profilePhoto: profilePhoto
        }
    );

    const data = {
        user: {
            id: user.id
        }
    }
    const authToken = jwt.sign(data, JWT_SECRET);

    // Save the user to the database
    user.save()
        .then(() => {
            console.log('User saved');
            return res.status(201).json({ msg: "User created successfully", authToken });
        })
        .catch((err) => {
            console.log(err.message);
            return res.status(500).json({ error: "Internal Server Error" });
        });
});

// Route 2: Authenticate a user using: POST "/api/auth/login". No login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 3: Get logged in user details using: POST "/api/auth/getuser". Login required
router.get('/getuser', fetchuser, async (req, res) => {
try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);

} catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
}
});

module.exports = router;