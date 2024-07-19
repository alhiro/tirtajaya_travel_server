var dbSeq = require('../config/sequelize')
var Sequelize = require('sequelize')

// Model car
const Car = dbSeq.define('car', {
  car_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  number_plat: {
    type: Sequelize.STRING(10),
    allowNull: true
  },
  car_number: {
    type: Sequelize.STRING(10),
    allowNull: true
  },
  name: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  photo: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
}, 
{
  tableName: 'car',
  freezeTableName: true,
  timestamps: true,
  paranoid: false,
  underscored: true,
})

module.exports = Car

