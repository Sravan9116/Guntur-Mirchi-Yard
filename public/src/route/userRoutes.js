const express = require('express');
const router = express.Router();
const userController = require('../controllers/loginController'); // Import the controller

// Route to register a new user
router.post('/register', userController.createUser);

// Route to login a user
router.post('/login', userController.loginUser);

// Route to get a user by ID
router.get('/:id', userController.getUserById);

router.post("/send-otp", (req, res) => {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ message: "Phone number required" });

    const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
    console.log(`OTP for ${phone}: ${otp}`); // Debugging (Check if this prints)

    // Normally, you'd send OTP via SMS API like Twilio
    return res.json({ message: "OTP sent successfully", otp });
});

module.exports = router;
