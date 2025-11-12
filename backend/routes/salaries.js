const express = require('express');
const router = express.Router();
const Salary = require('../models/Salary');

// CRUD similar to departments
router.get('/', async (req, res) => res.json(await Salary.find()));
router.get('/:id', async (req, res) => {
    const s = await Salary.findById(req.params.id);
    if (!s) return res.status(404).json({ message: 'Salary not found' });
    res.json(s);
});
router.post('/', async (req, res) => {
    const s = new Salary(req.body);
    await s.save();
    res.status(201).json(s);
});
router.put('/:id', async (req, res) => {
    const s = await Salary.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!s) return res.status(404).json({ message: 'Salary not found' });
    res.json(s);
});
router.delete('/:id', async (req, res) => {
    await Salary.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
});

module.exports = router;