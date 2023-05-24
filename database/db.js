const fs = require('fs');
const knex = require('knex');
const pg = require('pg');

// Configure PostgreSQL connection
const db = knex({
  client: 'pg',
  connection: {
    // Update with your PostgreSQL connection details
    host: 'localhost',
    user: 'postgres',
    password: '2019student',
    database: 'Crud',
  },
});

// Read the SQL file
const sql = fs.readFileSync('db.sql').toString();

// Execute the SQL script
db.raw(sql)
  .then(() => {
    console.log('Database created successfully.');
    // Further logic or application startup can be implemented here
  })
  .catch((error) => {
    console.error('An error occurred:', error);
  })
  .finally(() => {
    // Disconnect from the database
    db.destroy();
  });
