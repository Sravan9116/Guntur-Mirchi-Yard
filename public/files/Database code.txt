const { Sequelize } = require('sequelize');

// Database configuration
const sequelize = new Sequelize('postgres', 'postgres', '1234', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  logging: false, // Disable logging; you can enable it for debugging purposes
});

// Test the database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

testConnection();

module.exports = sequelize;
