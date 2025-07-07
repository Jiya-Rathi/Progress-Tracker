const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// POST /api/events
router.post('/', async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

// GET /api/events/:date
router.get('/:date', async (req, res) => {
  try {
    const events = await Event.findAll({ where: { event_date: req.params.date } });
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

module.exports = router;
