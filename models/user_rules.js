var dbSeq = require('../config/sequelize')
var Sequelize = require('sequelize')

// Get model DB
var Level = require('./level')
var Rules = require('./rules')

// Model user rules
const UserRules = dbSeq.define('user_rules', {
  rule_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  level_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'level',
      key: 'level_id'
    }
  },
  rules_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'rules',
      key: 'rules_id'
    }
  },
}, 
{
  tableName: 'user_rules',
  freezeTableName: true,
  timestamps: true,
  paranoid: false,
  underscored: true,
})

UserRules.belongsTo(Level, { foreignKey: "level_id" });
UserRules.belongsTo(Rules, { foreignKey: "rules_id" });

module.exports = UserRules

