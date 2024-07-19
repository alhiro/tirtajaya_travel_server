var dbSeq = require('../config/sequelize')
var Sequelize = require('sequelize')

const Category = dbSeq.define('category', {
  category_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
}, 
{
  tableName: 'category',
  freezeTableName: true,
  timestamps: true,
  paranoid: false,
  underscored: true,
  //defaultScope: { attributes: { exclude: ['password'] },},
});

module.exports = Category

