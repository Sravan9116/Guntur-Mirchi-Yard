const express = require('express');
const router = express.Router();
const userController = require('../controllers/loginController'); // Ensure path is correct
const multer = require('multer');
const path = require('path');
const User = require("../models/UserModel.js");

// Configure multer storage for profile picture uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Store images in 'uploads/' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename file to avoid conflicts
    }
});

const upload = multer({ storage });

// Routes
router.post('/register', upload.single('profilePicture'), userController.createUser);
router.post('/register', userController.createUser);  // Keep one route
router.post('/login', userController.loginUser);
router.get('/:id', userController.getUserById);

// ✅ Check User Details (Verification)
router.post("/check-user", async (req, res) => {
    const { userid, phone } = req.body;

    try {
        const user = await User.findOne({ where: { userid, phone } });

        if (user) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

module.exports = router;
