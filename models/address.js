var dbSeq = require('../config/sequelize')
var Sequelize = require('sequelize')

// Get model DB
var Customer = require('./customer')

// Model address
const Address = dbSeq.define('address', {
  address_id: {
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
  name: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  address: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  telp: {
    type: Sequelize.STRING(15),
    allowNull: true
  },
  default: {
    type: Sequelize.BOOLEAN,
    allowNull: true
  },
  admin: {
    type: Sequelize.STRING(50),
    allowNull: true
  },
  longitude: {
    type: Sequelize.DECIMAL(11,8),
    allowNull: true
  },
  latitude: {
    type: Sequelize.DECIMAL(11,8),
    allowNull: true
  },  
  zoom: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 7
  },
  description: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  used: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  time: {
    type: Sequelize.DATE,
    allowNull: true
  },
  created_by: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  updated_by: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
}, 
{
  tableName: 'address',
  freezeTableName: true,
  timestamps: true,
  paranoid: false,
  underscored: true,
  //defaultScope: { attributes: { exclude: ['password'] },},
});

Address.belongsTo(Customer, { foreignKey: "customer_id" });
Customer.hasMany(Address, { foreignKey: "customer_id" });

module.exports = Address

