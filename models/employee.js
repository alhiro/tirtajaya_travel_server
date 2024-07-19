var dbSeq = require('../config/sequelize')
var Sequelize = require('sequelize')

// Get model DB
var Car = require('./car')
var City = require('./city')
var Level = require('./level')

// Model employee
const Employee = dbSeq.define('employee', {
  employee_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
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
  level_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'level',
      key: 'level_id'
    }
  },
  nik: {
    type: Sequelize.STRING(50),
    allowNull: true
  },
  name: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  telp: {
    type: Sequelize.STRING(15),
    allowNull: true
  },
  photo: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  active: {
    type: Sequelize.STRING(5),
    allowNull: true
  },
  log: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
}, 
{
  tableName: 'employee',
  freezeTableName: true,
  timestamps: true,
  paranoid: false,
  underscored: true,
});

// Relation into car table
Employee.belongsTo(Car, { foreignKey: "car_id" });
// Relation into city table
Employee.belongsTo(City, { foreignKey: "city_id" });
// Relation into level table
Employee.belongsTo(Level, { foreignKey: "level_id" });

module.exports = Employee