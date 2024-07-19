var dbSeq = require('../config/sequelize')
var Sequelize = require('sequelize')

// Model city
const City = dbSeq.define('city', {
  city_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
}, 
{
  tableName: 'city',
  freezeTableName: true,
  timestamps: true,
  paranoid: false,
  underscored: true,
})

module.exports = City

