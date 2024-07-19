var dbSeq = require('../config/sequelize')
var Sequelize = require('sequelize')

// Model business
const Business = dbSeq.define('business', {
  business_id: {
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
  tableName: 'business',
  freezeTableName: true,
  timestamps: true,
  paranoid: false,
  underscored: true,
})

module.exports = Business

