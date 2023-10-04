// Import required packages
const express = require('express'); // Import the Express.js framework
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
const cors = require('cors'); // Middleware for enabling Cross-Origin Resource Sharing
const mysql = require('mysql2'); // Import the MySQL database driver

// Create an instance of the Express application
const app = express();

// Enable CORS for your Express app
app.use(cors());

// Middleware for parsing JSON request bodies
app.use(bodyParser.json());



// Connect to the MySQL database
const db = mysql.createConnection({
  host: 'localhost', // database host
  user: 'root', //  database username
  password: 'root', //  database password
  database: 'employee_management', //  database name
});



// Handle database connection status
db.connect((err) => {
  if (err) {
    console.error("Database connection error", err);
  } else {
    console.log("Connected to the database");
  }
});



// POST endpoint to insert a new employee
app.post('/api/employeeInsert', (req, res) => {
  // Destructure employee data from the request body
  const { first_name, last_name, phone_number, date_of_birth, email, address } = req.body;

  // SQL query to insert a new employee into the 'employees' table
  const sql = 'INSERT INTO employees(first_name, last_name, email, phone_number, date_of_birth, address) VALUES(?,?,?,?,?,?)';

  // Array of values corresponding to the placeholders in the SQL query
  const values = [first_name, last_name, email, phone_number, date_of_birth, address];

  // Execute the SQL query to insert the employee data
  db.query(sql, values, (err, result) => {
    if (err) {
      // Handle errors in case the insertion fails
      console.error('Error inserting data: ', err);
      res.status(500).json({ message: 'Error inserting data' });
    } else {
      // Respond with a success message if the insertion is successful
      console.log("Data inserted successfully");
      res.status(200).json({ message: 'Data inserted successfully' });
    }
  });
});



// GET endpoint to fetch all employees
app.get('/api/employeesGet', (req, res) => {
  // SQL query to retrieve all employee records from the 'employees' table
  const sql = 'SELECT * FROM employees';

  // Execute the SQL query to fetch all employee data
  db.query(sql, (err, results) => {
    if (err) {
      // Handle errors in case there's a problem fetching data
      console.error('Error fetching data: ', err);
      res.status(500).json({ message: 'Error fetching data' });
    } else {
      // Respond with the retrieved employee data if successful
      console.log('Data fetched successfully');
      res.status(200).json(results);
    }
  });
});



// DELETE endpoint to delete an employee by ID
app.delete('/api/employeeDelete/:id', (req, res) => {
  // Extract the employee ID from the request parameters
  const employeeId = req.params.id;

  // SQL query to delete an employee with the specified ID
  const sql = 'DELETE FROM employees WHERE id = ?';

  // Execute the SQL query to delete the employee
  db.query(sql, [employeeId], (err, result) => {
    if (err) {
      // Handle errors in case there's a problem deleting the employee
      console.error('Error deleting employee: ', err);
      res.status(500).json({ message: 'Error deleting employee' });
    } else {
      if (result.affectedRows === 0) {
        // If no employee was deleted (not found), respond with a 404 status and message
        res.status(404).json({ message: 'Employee not found' });
      } else {
        // Respond with a success message if the employee was deleted successfully
        console.log('Employee deleted successfully');
        res.status(200).json({ message: 'Employee deleted successfully' });
      }
    }
  });
});



// GET endpoint to fetch an employee by ID
app.get('/api/employeeGet/:id', (req, res) => {
  // Extract the employee ID from the request parameters
  const id = req.params.id;

  // SQL query to select an employee with the specified ID
  const sql = 'SELECT * FROM employees WHERE id = ?';

  // Execute the SQL query to fetch the employee
  db.query(sql, [id], (err, results) => {
    if (err) {
      // Handle errors in case there's a problem fetching the employee
      console.error('Error fetching data: ', err);
      res.status(500).json({ message: 'Error fetching data' });
    } else {
      if (results.length === 0) {
        // If no employee is found with the given ID, respond with a 404 status and message
        res.status(404).json({ message: 'Employee not found' });
      } else {
        // Respond with a success message and the fetched employee data
        console.log('Data fetched successfully');
        res.status(200).json(results[0]); // Send the first (and only) result
      }
    }
  });
});



// PUT endpoint to update an employee by ID
app.put('/api/employees/:id', (req, res) => {
  // Extract the employee ID from the request parameters
  const id = req.params.id;

  // Extract the updated employee data from the request body
  const { first_name, last_name, email, phone_number, date_of_birth, address } = req.body;

  // SQL query to update the employee data based on the provided ID
  const sql = 'UPDATE employees SET first_name=?, last_name=?, email=?, phone_number=?, date_of_birth=?, address=? WHERE id=?';

  // Define the values to be used in the SQL query
  const values = [first_name, last_name, email, phone_number, date_of_birth, address, id];

  // Execute the SQL query to update the employee data
  db.query(sql, values, (err, result) => {
    if (err) {
      // Handle errors in case there's a problem updating the employee
      console.error('Error updating data: ', err);
      res.status(500).json({ message: 'Error updating data' });
    } else {
      // Respond with a success message after the data is updated
      console.log('Data updated successfully');
      res.status(200).json({ message: 'Data updated successfully' });
    }
  });
});



// GET endpoint to fetch an employee by first_name and date_of_birth
app.get('/api/employeeGetByNameAndDOB/:first_name/:date_of_birth', (req, res) => {
  // Extract the first_name and date_of_birth from the request parameters
  const { first_name, date_of_birth } = req.params;

  // SQL query to select an employee by first_name and date_of_birth
  const sql = 'SELECT * FROM employees WHERE first_name = ? AND date_of_birth = ?';

  // Define the values to be used in the SQL query
  const values = [first_name, date_of_birth];

  // Execute the SQL query to fetch the employee data
  db.query(sql, values, (err, results) => {
    if (err) {
      // Handle errors in case there's a problem fetching the employee data
      console.error('Error fetching data: ', err);
      res.status(500).json({ message: 'Error fetching data' });
    } else {
      if (results.length === 0) {
        // Respond with a 404 status code and a message if no matching employee is found
        res.status(404).json({ message: 'Employee not found' });
      } else {
        // Respond with the fetched employee data if a match is found
        console.log('Data fetched successfully');
        res.status(200).json(results[0]); // Send the first (and only) result
      }
    }
  });
});



// Opening Port
app.listen(3000, () => {
  console.log("Server is running on 3000 PORT");
});
