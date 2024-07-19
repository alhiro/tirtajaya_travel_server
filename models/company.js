var dbSeq = require('../config/sequelize')
var Sequelize = require('sequelize')

// Model company
const Company = dbSeq.define('company', {
  company_id: {
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
  tableName: 'company',
  freezeTableName: true,
  timestamps: true,
  paranoid: false,
  underscored: true,
})

module.exports = Company

