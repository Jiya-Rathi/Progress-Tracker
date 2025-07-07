const { DataTypes } = require('sequelize');
const  sequelize  = require('./index');

const Todo = sequelize.define('todo', {
  user_id: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  text: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  due_date: DataTypes.DATEONLY,
  is_completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  completed_date: DataTypes.DATEONLY,
  display_order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Todo;
