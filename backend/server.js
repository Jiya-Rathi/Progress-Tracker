require('dotenv').config();
const express = require('express');
const cors = require('cors');

const  sequelize  = require('./models');
const dailyEntryRoutes = require('./routes/entries');
const eventRoutes = require('./routes/events');
const todoRoutes = require('./routes/todos');
const statRoutes = require('./routes/stats');

const app = express();

app.use(cors()); // You can configure origin if needed
app.use(express.json());

app.use('/api/entries', dailyEntryRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/stats', statRoutes);

// Sync DB and start server
const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true }) // ❗️Ensures tables match models (safe for dev)
  .then(() => {
    console.log("✅ DB synced");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error("❌ Unable to connect to DB:", err);
  });
