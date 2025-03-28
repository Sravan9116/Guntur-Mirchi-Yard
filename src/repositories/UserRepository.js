const User = require('../models/UserModel'); // Import the Sequelize model

// Function to get user by userId
const getUserByUserId = async (userid) => {
  const userIdNum = Number(userid);
  if (isNaN(userIdNum)) {
    console.error('Invalid userid:', userid); // Debugging log
    return null;
  }
  return await User.findOne({ where: { userid: userIdNum } });
};


// Repository function to create a new user
const createUser = async (userData) => {
  try {
    console.log('Received userData:', userData); // Log the input data (remove in production)

    // Ensure unique `userId`
    let isUnique = false;
    while (!isUnique) {
      // Check if the `userid` already exists in the database
      const existingUser = await getUserByUserId(userData.userid);
      if (!existingUser) {
        isUnique = true; // UserId is unique, proceed to create user
      } else {
        // Regenerate a new numeric `userId` if it already exists
        userData.userid = Math.floor(100000 + Math.random() * 900000);
      }
    }

    // Create the user in the database
    const user = await User.create(userData);
    console.log('User created successfully:', user); // Log the output (remove in production)

    // Remove sensitive data (password) before returning
    const { password, ...userWithoutPassword } = user.dataValues;
    return userWithoutPassword;
  } catch (error) {
    console.error('Error saving user to the database:', error); // Log the exact error
    throw new Error('Error saving user to the database');
  }
};

// Repository function to get a user by ID
const getUserById = async (userId) => {
  try {
    const user = await User.findOne({
      where: { id: userId }, // Assuming `id` is the primary key
    });

    // Remove sensitive data before returning
    if (user) {
      const { password, ...userWithoutPassword } = user.dataValues;
      return userWithoutPassword;
    }
    return null; // Return null if no user found
  } catch (error) {
    console.error('Error fetching user from the database:', error);
    throw new Error('Error fetching user from the database');
  }
};

// profile pic selecting

const updateUserProfilePic = async (userId, profilePicUrl) => {
  return await User.update({ profile_pic: profilePicUrl }, { where: { id: userId } });
};

// Repository function to get a user by username
const getUserByUsername = async (username) => {
  try {
    const user = await User.findOne({
      where: { username },
    });
    if (user) {
      console.log('Fetched User from Database:', user); // Log the full user object
      return user; // Return the full user object (including password)
    }
  } catch (error) {
    console.error('Error fetching user by username from the database:', error);
    throw new Error('Error fetching user by username from the database');
  }
};

module.exports = { createUser, getUserById, getUserByUsername, getUserByUserId, updateUserProfilePic  };
