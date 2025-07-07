const { DataTypes } = require('sequelize');
const  sequelize  = require('./index');

const UserStat = sequelize.define('user_stat', {
  user_id: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  stat_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  total_coding_questions: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  avg_thesis_score: DataTypes.DECIMAL(3, 2),
  avg_studies_score: DataTypes.DECIMAL(3, 2),
  avg_projects_score: DataTypes.DECIMAL(3, 2),
  todos_completed: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  todos_completed_on_time: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  streak_days: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  indexes: [{ unique: true, fields: ['user_id', 'stat_date'] }]
});

module.exports = UserStat;
