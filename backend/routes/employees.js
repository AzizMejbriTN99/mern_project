const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const Department = require('../models/Department');

// GET all
router.get('/', async (req, res) => {
    const employees = await Employee.find().populate('departmentId').populate('salaryId');
    res.json(employees);
});

// GET by ID
router.get('/:id', async (req, res) => {
    const e = await Employee.findById(req.params.id).populate('departmentId').populate('salaryId');
    if (!e) return res.status(404).json({ message: 'Employee not found' });
    res.json(e);
});

// POST create
router.post("/", async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update
router.put("/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
    await Employee.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
});

module.exports = router;