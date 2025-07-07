const { DataTypes } = require('sequelize');
const sequelize = require('./index');


const DailyEntry = sequelize.define('daily_entry', {
  user_id: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  entry_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  coding_description: DataTypes.TEXT,
  coding_questions_solved: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  coding_tags: DataTypes.ARRAY(DataTypes.TEXT),
  thesis_description: DataTypes.TEXT,
  thesis_contribution_score: {
    type: DataTypes.INTEGER,
    validate: { min: 0, max: 10 }
  },
  studies_description: DataTypes.TEXT,
  studies_study_score: {
    type: DataTypes.INTEGER,
    validate: { min: 0, max: 10 }
  },
  applications_description: DataTypes.TEXT,
  projects_description: DataTypes.TEXT,
  projects_contribution_score: {
    type: DataTypes.INTEGER,
    validate: { min: 0, max: 10 }
  },
  notes: DataTypes.TEXT
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [{ unique: true, fields: ['user_id', 'entry_date'] }]
});

module.exports = DailyEntry;
