var dbSeq = require('../config/sequelize')
var Sequelize = require('sequelize')

// Get model DB
var Customer = require('./customer')

// Model courier
const Courier = dbSeq.define('courier', {
  courier_id: {
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
  package_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  taking_time: {
    type: Sequelize.TIME,
    allowNull: true
  },
  taking_by: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  taking_status: {
    type: Sequelize.BOOLEAN,
    allowNull: true
  },
  office: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  updated_at: {
    type: Sequelize.DATE,
    allowNull: true
  },
  updated_by: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
}, 
{
  tableName: 'courier',
  freezeTableName: true,
  timestamps: true,
  paranoid: false,
  underscored: true,
})

Courier.belongsTo(Customer, { foreignKey: "customer_id" });

module.exports = Courier

