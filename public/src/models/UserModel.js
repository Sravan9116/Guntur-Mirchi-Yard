const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust path as needed

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userid: {
    type: DataTypes.INTEGER,  // Ensure numeric `userId`
    unique: true,  // Ensure uniqueness in DB
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone_code: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  user_type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'users', // Explicitly specify the table name
  timestamps: false, // Disable createdAt and updatedAt
});

module.exports = User;
