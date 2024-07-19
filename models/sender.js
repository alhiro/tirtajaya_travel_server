var dbSeq = require('../config/sequelize')
var Sequelize = require('sequelize')

// Get model DB
var Customer = require('./customer')
var Package = require('./package')

// Model sender
const Sender = dbSeq.define('sender', {
  sender_id: {
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
  // name: {
  //   type: Sequelize.STRING(100),
  //   allowNull: true
  // },
  // address: {
  //   type: Sequelize.STRING(255),
  //   allowNull: true
  // },
  // telp: {
  //   type: Sequelize.STRING(255),
  //   allowNull: true
  // },
  // longitude: {
  //   type: Sequelize.DECIMAL(11,8),
  //   allowNull: true
  // },
  // latitude: {
  //   type: Sequelize.DECIMAL(11,8),
  //   allowNull: true
  // },  
  // zoom: {
  //   type: Sequelize.INTEGER,
  //   allowNull: true,
  //   defaultValue: 7
  // },
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
  tableName: 'sender',
  freezeTableName: true,
  timestamps: true,
  paranoid: false,
  underscored: true,
  //defaultScope: { attributes: { exclude: ['password'] },},
});

Sender.belongsTo(Customer, { foreignKey: "customer_id" });

module.exports = Sender

