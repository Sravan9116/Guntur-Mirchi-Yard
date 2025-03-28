const userService = require('../services/UserService');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = cloudinary;

const createUser = async (req, res) => {
    try {
        const userData = req.body;

        // Validate input fields
        if (!userData.username || !userData.password || !userData.email || !userData.phone) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        console.log("Creating user with data:", userData); // Debugging log

        // Pass the data to the service to create the user
        const newUser = await userService.createUser(userData);

        return res.status(201).json({ success: true, message: 'User registered successfully', data: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ success: false, message: 'Error creating user' });
    }
};

// Controller function to login user
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input fields
        if (!username || !password) {
            return res.status(400).json({ success: false, message: 'Username and password are required.' });
        }

        // Pass the data to the service to handle login
        const { token, user } = await userService.loginUser(username, password);

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user,
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ success: false, message: error.message || 'Server error: Unable to login user' });
    }
};

// Controller function to get user by ID
const getUserById = async (req, res) => {
    try {
        const userId = Number(req.params.id);

        // Check if userId is valid
        if (isNaN(userId)) {
            return res.status(400).json({ success: false, message: 'Invalid user ID' });
        }

        // Fetch the user by ID from the service layer
        const user = await userService.getUserById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        return res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ success: false, message: error.message || 'Server error: Unable to fetch user' });
    }
};

// Controller function to upload profile picture
const User = require('../models/UserModel'); 

const updateProfilePicture = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        const filePath = req.file.path; // Uploaded file path
        console.log("Uploading file:", filePath);

        // Ensure file exists before upload
        if (!fs.existsSync(filePath)) {
            return res.status(400).json({ success: false, message: "File not found" });
        }

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(filePath, { folder: "profile_pictures" });

        console.log("Uploaded Image URL:", result.secure_url);

        // Get user ID safely
        const userId = req.user ? req.user.id : req.body.userId;
        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is missing" });
        }

        // Update database with Cloudinary URL
        await User.update(
            { profile_pic: result.secure_url }, 
            { where: { id: userId } }
        );

        return res.json({ success: true, profile_pic: result.secure_url });
    } catch (error) {
        console.error("Error Uploading Image:", error);
        res.status(500).json({ success: false, message: "Upload failed" });
    }
};

module.exports = { createUser, loginUser, getUserById, updateProfilePicture };

