const express = require('express');
const mysql = require('mysql2');
require('dotenv').config(); // Load environment variables
const app = express();

DB_USERNAME="root"
DB_HOST="localhost"
DB_PASSWORD="Benjamin@1"
DB_NAME="hospital_db"

app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// Question 1. Retrieve all patients
app.get('/patients', (req, res) => {
    const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to retrieve patients' });
      }
      res.status(200).json(results);
    });
  });

  
  // Question 2. Retrieve all providers
  app.get('/providers', (req, res) => {
    const query = 'SELECT first_name, last_name, provider_specialty FROM providers';
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to retrieve providers' });
      }
      res.status(200).json(results);
    });
  });


// Question 3. Filter patients by First Name
app.get('/patients/search', (req, res) => {
  const { first_name } = req.query;
  const query = 'SELECT * FROM patients WHERE first_name = ?';
  db.query(query, [first_name], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to filter patients' });
    }
    res.status(200).json(results);
  });
});


// Question 4. Retrieve all providers by their specialty
app.get('/providers/specialty', (req, res) => {
  const { specialty } = req.query;
  const query = 'SELECT * FROM providers WHERE provider_specialty = ?';
  db.query(query, [specialty], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve providers by specialty' });
    }
    res.status(200).json(results);
  });
});
