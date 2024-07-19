var dbSeq = require('../config/sequelize')
var Sequelize = require('sequelize')

// Get model DB
var Employee = require('./employee')
var Level = require('./level')

// Model users
const Users = dbSeq.define('users', {
  user_id: {
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
  level_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'level',
      key: 'level_id'
    }
  },
  name: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  email: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  username: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  register_date: {
    type: Sequelize.STRING(50),
    allowNull: true
  },
  last_login: {
    type: Sequelize.DATE,
    allowNull: true
  },
  token: {
    type: Sequelize.STRING,
    allowNull: true
  },
  refresh_token: {
    type: Sequelize.STRING,
    allowNull: true
  },
  reset_token: {
    type: Sequelize.STRING,
    allowNull: true
  },
  expired_reset_token: {
    type: Sequelize.DATE,
    allowNull: true
  },
}, 
{
  tableName: 'users',
  freezeTableName: true,
  timestamps: true,
  paranoid: false,
  underscored: true,
});

Users.belongsTo(Employee, { foreignKey: "employee_id" });
Users.belongsTo(Level, { foreignKey: "level_id" });

module.exports = Users

