const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  jobTitle: String,
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
  salaryId: { type: mongoose.Schema.Types.ObjectId, ref: "Salary" }, // renamed
});

module.exports = mongoose.model('Employee', employeeSchema);