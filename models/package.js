var dbSeq = require('../config/sequelize')
var Sequelize = require('sequelize')

// Get model DB
var Sender = require('./sender')
var Recipient = require('./recipient')
var City = require('./city')
var Employee = require('./employee')
var Category = require('./category')
var Courier = require('./courier')
var GoSend = require('./go_send')

// Model package
const Package = dbSeq.define('package', {
  package_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  sender_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'sender',
      key: 'sender_id'
    }
  },
  recipient_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'recipient',
      key: 'recipient_id'
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
  employee_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'employee',
      key: 'employee_id'
    }
  },
  category_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'category',
      key: 'category_id'
    }
  },
  courier_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'courier',
      key: 'courier_id'
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
  category_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  city_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  description: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  cost: {
    type: Sequelize.DECIMAL(18, 0),
    allowNull: true
  },
  koli: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  discount: {
    type: Sequelize.DECIMAL(18, 0),
    allowNull: true
  },
  payment: {
    type: Sequelize.DECIMAL(18, 0),
    allowNull: true
  },
  origin_from: {
    type: Sequelize.STRING(50),
    allowNull: true
  },
  level: {
    type: Sequelize.STRING(50),
    allowNull: true
  },
  request: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  request_description: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  note: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  status: {
    type: Sequelize.STRING(50),
    allowNull: true
  },
  status_package: {
    type: Sequelize.STRING(50),
    allowNull: true
  },
  resi_number: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  photo: {
    type: Sequelize.STRING(500),
    allowNull: true
  },
  print: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  move_time: {
    type: Sequelize.TIME,
    allowNull: true
  },
  book_date: {
    type: Sequelize.DATE,
    allowNull: true
  },
  send_date: {
    type: Sequelize.DATE,
    allowNull: true
  },
  check_payment: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  check_sp: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  check_date_sp: {
    type: Sequelize.DATE,
    allowNull: true
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
  tableName: 'package',
  freezeTableName: true,
  timestamps: true,
  paranoid: false,
  underscored: true,
});


Package.belongsTo(Sender, { foreignKey: "sender_id" });
Sender.belongsTo(Package, { foreignKey: "sender_id" });

Package.belongsTo(Recipient, { foreignKey: "recipient_id" });
Recipient.belongsTo(Package, { foreignKey: "recipient_id" });

Package.belongsTo(City, { foreignKey: "city_id" });

Package.belongsTo(Employee, { foreignKey: "employee_id" });
Employee.hasMany(Package, { foreignKey: "employee_id" });

Package.belongsTo(Category, { foreignKey: "category_id" });

Package.belongsTo(Courier, { foreignKey: "courier_id" });
Courier.belongsTo(Package, { foreignKey: "courier_id" });

Package.belongsTo(GoSend, { foreignKey: "go_send_id" });
GoSend.hasMany(Package, { foreignKey: "go_send_id" });

module.exports = Package

