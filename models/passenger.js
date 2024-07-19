var dbSeq = require('../config/sequelize')
var Sequelize = require('sequelize')

// Get model DB
var Waybill = require('./waybill')
var Destination = require('./destination')
var Employee = require('./employee')
var GoSend = require('./go_send')

// Model passenger
const Passenger = dbSeq.define('passenger', {
  passenger_id: {
    type: Sequelize.INTEGER, 
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  waybill_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'waybill',
      key: 'waybill_id'
    }
  },
  destination_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'destination',
      key: 'destination_id'
    }
  },
  employee_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'employee',
      key: 'employee_id'
    }
  },
  go_send_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'go_send',
      key: 'go_send_id'
    }
  },
  tariff: {
    type: Sequelize.DECIMAL(18, 0),
    allowNull: true
  },
  discount: {
    type: Sequelize.DECIMAL(18, 0),
    allowNull: true
  },
  agent_commission: {
    type: Sequelize.DECIMAL(18, 0),
    allowNull: true
  },
  other_fee: {
    type: Sequelize.DECIMAL(18, 0),
    allowNull: true
  },
  total_passenger: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  payment: {
    type: Sequelize.STRING(50),
    allowNull: true
  },
  status: {
    type: Sequelize.STRING(50),
    allowNull: true
  },
  note: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  description: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  resi_number: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  cancel: {
    type: Sequelize.BOOLEAN,
    allowNull: true
  },
  move: {
    type: Sequelize.BOOLEAN,
    allowNull: true
  },
  position: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  charter: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  check_payment: {
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
  tableName: 'passenger',
  freezeTableName: true,
  timestamps: true,
  paranoid: false,
  underscored: true,
});


Passenger.belongsTo(Waybill, { foreignKey: "waybill_id" });
// Waybill.belongsTo(Passenger, { foreignKey: "waybill_id" });

Passenger.belongsTo(Destination, { foreignKey: "destination_id" });
// Destination.belongsTo(Passenger, { foreignKey: "destination_id" });

Passenger.belongsTo(Employee, { foreignKey: "employee_id" });

Passenger.belongsTo(GoSend, { foreignKey: "go_send_id" });
// GoSend.belongsTo(Passenger, { foreignKey: "go_send_id" });

module.exports = Passenger

