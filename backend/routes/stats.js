const express = require('express');
const router = express.Router();
const UserStat = require('../models/UserStat');

// GET /api/stats/:date
router.get('/:date', async (req, res) => {
  try {
    const stat = await UserStat.findOne({ where: { stat_date: req.params.date } });
    res.json(stat || {});
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

module.exports = router;
