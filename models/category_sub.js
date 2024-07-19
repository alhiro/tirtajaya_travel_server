var dbSeq = require('../config/sequelize')
var Sequelize = require('sequelize')

// Get model DB
var Category = require('./category')

const CategorySub = dbSeq.define('category_sub', {
  category_sub_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  category_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'category',
      key: 'category_id'
    }
  },
  name: {
    type: Sequelize.STRING(50),
    allowNull: true
  },
}, 
{
  tableName: 'category_sub',
  freezeTableName: true,
  timestamps: true,
  paranoid: false,
  underscored: true,
});

CategorySub.belongsTo(Category, { foreignKey: "category_id" });
Category.hasMany(CategorySub, { foreignKey: "category_id" });

module.exports = CategorySub