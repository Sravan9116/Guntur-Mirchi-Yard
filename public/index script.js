const { Client } = require('pg');

// Set up your PostgreSQL client
const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres', // Replace with your PostgreSQL username
  password: '1234',  // Replace with your PostgreSQL password
  database: 'postgres 2',  // Replace with your database name
});

// Connect to the database
client.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Connection error', err.stack));

// Query to fetch all users
client.query('SELECT * FROM users;', (err, res) => {
  if (err) {
    console.error('Error executing query', err.stack);
  } else {
    console.log('Users:', res.rows);  // Output the users
  }
  client.end();  // Close the connection after the query
});
