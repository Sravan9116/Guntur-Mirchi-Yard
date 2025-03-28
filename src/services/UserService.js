const userRepository = require('../repositories/UserRepository'); // Import the repository
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken'); // For token generation

// Service function to create a new user
const createUser = async (userData) => {
  try {
    // Check if the username already exists
    const existingUser = await userRepository.getUserByUsername(userData.username);
    if (existingUser) {
      throw new Error('Username already exists, please choose a different one');
    }

    // Generate a unique numeric `userid`
    let userid = Math.floor(100000 + Math.random() * 900000);
    let userWithSameId = await userRepository.getUserByUserId(userid);
    while (userWithSameId) {
      userid = Math.floor(100000 + Math.random() * 900000);
      userWithSameId = await userRepository.getUserByUserId(userid);
    }

    // Assign the validated `userid` to userData
    userData.userid = userid;

    // Hash the password
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;



    // Save user in the database
    const newUser = await userRepository.createUser(userData);
    return newUser;
  } catch (error) {
    console.error(error);
    throw new Error('Error creating user');
  }
};

// Service function to login a user
const loginUser = async (username, password) => {
  try {
    // Fetch the user by username
    const user = await userRepository.getUserByUsername(username);
    if (!user) {
      throw new Error('Invalid username or password');
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid username or password');
    }

    // Destructure user object but include `profile_pic`
    const { password: hashedPassword, ...userWithoutPassword } = user.dataValues;


    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, profile_pic: userWithoutPassword.profile_pic },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return { user: userWithoutPassword, token };
  } catch (error) {
    console.error(error);
    throw new Error('Error logging in user');
  }
};

// Service function to get a user by ID
const getUserById = async (userId) => {
  try {
    // Fetch user from DB
    const user = await userRepository.getUserById(userId);
    return user;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching user');
  }
};

// Update user passwords to hashed values (for old users)
const updatePasswords = async () => {
  try {
    const users = await userRepository.getAllUsers();
    for (let user of users) {
      if (user.password && user.password.length < 60) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        await userRepository.updateUserPassword(user.id, hashedPassword);
        console.log(`Updated password for user: ${user.username}`);
      }
    }
  } catch (error) {
    console.error('Error updating passwords:', error);
  }
};

const updateUserProfilePic = async (userId, imageUrl) => {
  try {
      const user = await userRepository.getUserById(userId);
      if (!user) {
          throw new Error('User not found');
      }

      await userRepository.updateUser(userId, { profile_pic: imageUrl });
      return { success: true, profile_pic: imageUrl };
  } catch (error) {
      console.error('Error updating profile picture:', error);
      throw new Error('Failed to update profile picture');
  }
};


module.exports = { createUser, loginUser, getUserById, updatePasswords, updateUserProfilePic };
