const express = require('express');
const router = express.Router();
const Department = require('../models/Department');

// GET all
router.get('/', async (req, res) => {
    const deps = await Department.find();
    res.json(deps);
});

// GET by ID
router.get('/:id', async (req, res) => {
    const dep = await Department.findById(req.params.id);
    if (!dep) return res.status(404).json({ message: 'Department not found' });
    res.json(dep);
});

// POST create
router.post('/', async (req, res) => {
    const dep = new Department(req.body);
    await dep.save();
    res.status(201).json(dep);
});

// PUT update
router.put('/:id', async (req, res) => {
    const dep = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!dep) return res.status(404).json({ message: 'Department not found' });
    res.json(dep);
});

// DELETE
router.delete('/:id', async (req, res) => {
    await Department.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
});

module.exports = router;