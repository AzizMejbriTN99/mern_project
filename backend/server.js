const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const deps = require('./routes/departments');
const emps = require('./routes/employees');
const sals = require('./routes/salaries');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mern_blog')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB Error:', err));

app.use('/api/departments', deps);
app.use('/api/employees', emps);
app.use('/api/salaries', sals);

app.get('/', (req, res) => res.json({ message: 'API MERN - Employees/Departments/Salaries' }));

app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

module.exports = app;