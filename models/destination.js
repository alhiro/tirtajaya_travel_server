var dbSeq = require('../config/sequelize')
var Sequelize = require('sequelize')

// Get model DB
var Customer = require('./customer')
var Address = require('./address')

// Model destination
const Destination = dbSeq.define('destination', {
  destination_id: {
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
  package_id: {
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
  tableName: 'destination',
  freezeTableName: true,
  timestamps: true,
  paranoid: false,
  underscored: true,
  //defaultScope: { attributes: { exclude: ['password'] },},
});

Destination.belongsTo(Customer, { foreignKey: "customer_id" });
// Destination.belongsTo(Address, { foreignKey: "customer_id" });

module.exports = Destination

