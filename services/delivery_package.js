const Model = require('../models/delivery_package');
const ModelPackage = require('../models/package');

const sequelize = require("../config/sequelize");
const Sequelizes = require('sequelize');

const { count } = require('sequelize/lib/model');

module.exports =
{
  get: async (id) => {
    try {
      return await Model.findOne({
        where: {
          delivery_package_id: id
        },
        include: [
          {
            model: ModelPackage,
          }
        ]
      }).then((resp) => {
        return (!resp) ? 
            { success: false, message: "Delivery package not find!", data: {} } : 
            { success: true, message: "Delivery package exist", data: resp }
      });
    } catch (error) {
      throw error
    }
  },

  list: async () => {
    try {
      return await Model.findAll({
        // where: {
        //   active: 'TRUE'
        // },
        // attributes: ['id',
        //             'name',
        //             'level',
        // ],
        // order: [
        //   ["name", "ASC"]
        // ]
      }).then((resp) => {
        return (!resp) ? 
            { success: false, message: "Delivery Package not find!", data: {} } : 
            { success: true, message: "Delivery Package success find", data: resp }
      });
    } catch (error) {
      throw error
    }
  },

  findOrCreate: async (req) => {
    try {
      const { customer_id, package_id, admin, description, used, time, created_by } = req
      var objData = {
        customer_id: customer_id,
        package_id: package_id,
        admin: admin,
        description: description,
        used: used,
        time: time,
        created_by: created_by
      }
      console.log("objData")
      console.log(objData)

      const params = {
        package_id: package_id,
      };

      const insert = await Model.findOrCreate({ where: params, defaults: objData })
      console.log("insert")
      console.log(insert[1])

      // check is already registered or not
      if (!insert[1]) {
        throw ({ success: false, message: "Delivery Package exist! Please create with different value", data: {} })
      }
      
      return { success: true, message: "Delivery Package has success created", data: insert[0].dataValues }
    } catch (error) {
      console.log(error);
      throw (error)
    }
  },

  update: async (req) => {
    try {

      const { delivery_package_id, customer_id, package_id, admin, description, used, time, updated_by } = req
      var objData = {
        delivery_package_id: delivery_package_id,
        customer_id: customer_id,
        package_id: package_id,
        admin: admin,
        description: description,
        used: used,
        time: time,
        updated_by: updated_by
      }
      console.log("objData")
      console.log(objData)

      const params = {
        delivery_package_id: delivery_package_id,
      };

      return Model.update(objData, { where: params })
      .then(async () => { 
          return { success: true, message: "Delivery Package success changed", data: objData } })
      .catch((err) => { return { success: false, message: "Delivery Package failed change", data: err } });
    } catch (error) {
      throw (error)
    }
  },

  delete: async (data) => {
    try {
      const { id } = data;

      return Model.destroy({
        where: {
          id: id,
        },
      })
        .then(async (deleted) => {
          console.log('deleted')
          console.log(deleted)
          if (deleted == 0) {
            return { success: true, message: "This Delivery Package not find", data: [] }
          } else {
            return { success: true, message: "This Delivery Package success delete", data: [] }
          }
        })
        .catch((err) => {
          console.log(err);
          return { success: false, message: "Delivery Package failed to remove", data: err }
        });
    } catch (error) {
      console.log(error);
      throw (error)
    }
  },

  search: async (params) => {
    const Op = Sequelizes.Op;

    try {
      // search multi word in table user column name with %foo%
      return await Model.findAll({
        where: {
          [Op.or]: [
            { resi_number: { [Sequelizes.Op.iLike]: `%${params.resi_number}%` } },
          ]
        },
        order: [["created_at", "ASC"]],
      }).then((resp) => {
        return (resp.length > 0) ? 
        { success: true, message: "Delivery Package success find", data: resp } : 
        { success: false, message: "Delivery Package not find!", data: {} }
      });
    } catch (error) {
      console.log(error);
      throw error
    }
  },

}