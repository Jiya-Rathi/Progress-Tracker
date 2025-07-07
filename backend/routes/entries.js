const express = require('express');
const router = express.Router();
const DailyEntry = require('../models/DailyEntry');

// POST /api/entries
router.post('/', async (req, res) => {
  try {
    const entry = await DailyEntry.upsert(req.body);
    res.json(entry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save entry' });
  }
});

// GET /api/entries/:date
router.get('/:date', async (req, res) => {
  try {
    const entry = await DailyEntry.findOne({
      where: { entry_date: req.params.date }
    });
    res.json(entry || {});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch entry' });
  }
});

module.exports = router;
