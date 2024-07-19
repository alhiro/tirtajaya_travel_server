var dbSeq = require('../config/sequelize')
var Sequelize = require('sequelize')

// Get model DB
var Customer = require('./customer')
var Address = require('./address')

// Model waybill
const Waybill = dbSeq.define('waybill', {
  waybill_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  customer_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'customer',
      key: 'customer_id'
    }
  },
  // address_id: {
  //   type: Sequelize.INTEGER,
  //   allowNull: true,
  //   references: {
  //     model: 'address',
  //     key: 'address_id'
  //   }
  // },
  passenger_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  date: {
    type: Sequelize.DATE,
    allowNull: true
  },
  time: {
    type: Sequelize.TIME,
    allowNull: true
  },
  updated_by: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  created_by: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
}, 
{
  tableName: 'waybill',
  freezeTableName: true,
  timestamps: true,
  paranoid: false,
  underscored: true,
  //defaultScope: { attributes: { exclude: ['password'] },},
});

Waybill.belongsTo(Customer, { foreignKey: "customer_id" });
// Waybill.belongsTo(Address, { foreignKey: "address_id" });

module.exports = Waybill

