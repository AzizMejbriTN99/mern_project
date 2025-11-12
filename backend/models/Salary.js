const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
    baseSalary: { type: Number, required: true },
    bonus: { type: Number, default: 0 },
    deductions: { type: Number, default: 0 }
});

module.exports = mongoose.model('Salary', salarySchema);