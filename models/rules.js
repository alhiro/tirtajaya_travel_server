var dbSeq = require('../config/sequelize')
var Sequelize = require('sequelize')

// Model rules
const Rule = dbSeq.define('rules', {
  rules_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING(50),
    allowNull: true
  },
}, 
{
  tableName: 'rules',
  freezeTableName: true,
  timestamps: true,
  paranoid: false,
  underscored: true,
})

module.exports = Rule

