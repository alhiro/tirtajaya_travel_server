var dbSeq = require('../config/sequelize')
var Sequelize = require('sequelize')

// Get model DB
var Employee = require('./employee')
var Car = require('./car')
var City = require('./city')

// Model go send
const GoSend = dbSeq.define('go_send', {
  go_send_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  employee_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'employee',
      key: 'employee_id'
    }
  },
  car_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'car',
      key: 'car_id'
    }
  },
  city_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'city',
      key: 'city_id'
    }
  },
  package_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  description: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  status: {
    type: Sequelize.STRING(10),
    allowNull: true
  },
  send_time: {
    type: Sequelize.TIME,
    allowNull: true
  },
  send_date: {
    type: Sequelize.DATE,
    allowNull: true
  },
  sp_number: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  sp_package: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  sp_passenger: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  bsd: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  bsd_passenger: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  box: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  bsd_box: {
    type: Sequelize.STRING(100),
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
  tableName: 'go_send',
  freezeTableName: true,
  timestamps: true,
  paranoid: false,
  underscored: true,
})

GoSend.belongsTo(Car, { foreignKey: "car_id" });
GoSend.belongsTo(City, { foreignKey: "city_id" });
GoSend.belongsTo(Employee, { foreignKey: "employee_id" });

module.exports = GoSend

