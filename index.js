// index.js
const express = require('express');
const db = require('../src/config/db');
require('dotenv').config();

const app = express();
app.use(express.json()); // JSON data read කිරීමට

// Basic test route
app.get('/', (req, res) => {
  res.send('Backend Server is Running!');
});

// GET: සියලුම Users ලා ලබා ගැනීම (SQL Query)
app.get('/api/users', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST: අලුත් User කෙනෙක් එකතු කිරීම
app.post('/api/users', async (req, res) => {
  const { name, email } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );
    res.status(201).json({ id: result.insertId, name, email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});