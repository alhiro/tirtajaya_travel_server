var dbSeq = require('../config/sequelize')
var Sequelize = require('sequelize')

// Get model DB
var Business = require('./business')
var Company = require('./company')

// Model customer
const Customer = dbSeq.define('customer', {
  customer_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  business_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'business',
      key: 'business_id'
    }
  },
  company_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'company',
      key: 'company_id'
    }
  },
  name: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  telp: {
    type: Sequelize.STRING(15),
    allowNull: true
  },
  admin: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  address: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  status: {
    type: Sequelize.STRING(10),
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
  tableName: 'customer',
  freezeTableName: true,
  timestamps: true,
  paranoid: false,
  underscored: true,
})

Customer.belongsTo(Business, { foreignKey: "business_id" });
Customer.belongsTo(Company, { foreignKey: "company_id" });

module.exports = Customer

