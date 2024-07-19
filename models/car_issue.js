var dbSeq = require('../config/sequelize')
var Sequelize = require('sequelize')

// Get model DB
var SP = require('./sp')
var Package = require('./package')

// Model car
const CarIssue = dbSeq.define('car_issue', {
  car_issue_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  package_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'package',
      key: 'package_id'
    }
  },
  sp_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'sp',
      key: 'sp_id'
    }
  },
  plat_number: {
    type: Sequelize.STRING(10),
    allowNull: true
  },
  driver: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  last_km: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  radiator: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  tire_pressure: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  interior: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  wipper: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  anti_slip: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  body: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  description: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
}, 
{
  tableName: 'car_issue',
  freezeTableName: true,
  timestamps: true,
  paranoid: false,
  underscored: true,
})

CarIssue.belongsTo(SP, { foreignKey: "sp_id" });
CarIssue.belongsTo(Package, { foreignKey: "package_id" });

module.exports = CarIssue

