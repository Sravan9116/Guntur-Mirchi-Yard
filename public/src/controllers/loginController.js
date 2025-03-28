                  const userService = require('../services/UserService'); // Ensure this path is correct

                  const createUser = async (req, res) => {
                    try {
                      const userData = req.body;

                      // Validate input fields
                      if (!userData.username || !userData.password || !userData.email || !userData.phone) {
                        return res.status(400).json({ message: 'All fields are required.' });
                      }

                      // // Ensure userId is a valid number if it exists
                      // if (userData.userId) {
                      //   const parsedUserId = Number(userData.userId);
                      //   if (isNaN(parsedUserId)) {
                      //     return res.status(400).json({ message: 'Invalid user ID' });
                      //   }
                      //   userData.userId = parsedUserId;
                      // }

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

                  module.exports = { createUser, loginUser, getUserById };
