const { DataTypes } = require('sequelize');
const sequelize = require('../config/Database'); // Import sequelize instance
const { v4: uuidv4 } = require('uuid'); // Import uuid module for generating UUID

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // Use Sequelize's built-in UUID generator
    primaryKey: true,
    field: 'id',
  },
  
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    field: 'username',
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: 'password',
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    field: 'email',
  },
  phone: {
    type: DataTypes.STRING(15),
    allowNull: false,
    field: 'phone',
  },
  phone_code: {
    type: DataTypes.STRING(10),
    allowNull: true,
    field: 'phone_code',
  },
  user_type: {
    type: DataTypes.STRING(20),
    allowNull: true,
    field: 'user_type',
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'created_at',
  },
}, {
  tableName: 'users',
  timestamps: false, // Disable Sequelize's automatic timestamp columns
});

module.exports = User;
