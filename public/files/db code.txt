const { Sequelize } = require('sequelize');

// Setup database connection using Sequelize
const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'mysql', // Assuming you're using MySQL, adjust if using PostgreSQL or others
  logging: false,   // Disable SQL logging
});

module.exports = sequelize;
