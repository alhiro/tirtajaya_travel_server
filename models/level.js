var dbSeq = require('../config/sequelize')
var Sequelize = require('sequelize')

// Model level
const Level = dbSeq.define('level', {
  level_id: {
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
  tableName: 'level',
  freezeTableName: true,
  timestamps: true,
  paranoid: false,
  underscored: true,
})

module.exports = Level

