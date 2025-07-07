const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Event = sequelize.define('event', {
  user_id: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  title: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  event_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  event_type: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  notes: DataTypes.TEXT
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Event;
