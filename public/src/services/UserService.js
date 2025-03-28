const userRepository = require('../repositories/UserRepository'); // Import the repository
const bcrypt = require('bcrypt'); // For password hashing and comparison
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
    let userid = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit number
    console.log('Checking userid before querying DB:', userid);

    // Ensure userid is unique in the database
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

    // Call the repository to save the user in the database
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

    console.log('Plain Password:', password);
    console.log('Hashed Password from DB:', user.password);

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid username or password');
    }

    // Rename destructured variable to avoid conflict
    const { password: hashedPassword, ...userWithoutPassword } = user.dataValues;

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
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
    // Call the repository to fetch user from the database by ID
    const user = await userRepository.getUserById(userId);
    return user;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching user');
  }
};

// Service function to update user passwords to hashed values (Step-3)
const updatePasswords = async () => {
  try {
    const users = await userRepository.getAllUsers(); // Fetch all users from DB
    for (let user of users) {
      // Check if the password is not already hashed (assuming bcrypt hashes are at least 60 characters)
      if (user.password && user.password.length < 60) {
        const hashedPassword = await bcrypt.hash(user.password, 10); // Hash the password
        user.password = hashedPassword;
        await userRepository.updateUserPassword(user.id, hashedPassword); // Update password in DB
        console.log(`Updated password for user: ${user.username}`);
      }
    }
  } catch (error) {
    console.error('Error updating passwords:', error);
  }
};

module.exports = { createUser, loginUser, getUserById, updatePasswords };
