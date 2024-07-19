const Model = require('../models/waybill');
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
          waybill_id: id
        },
      }).then((resp) => {
        return (!resp) ? 
            { success: false, message: "Waybill not find!", data: {} } : 
            { success: true, message: "Waybill exist", data: resp }
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
            { success: false, message: "Waybill not find!", data: {} } : 
            { success: true, message: "Waybill success find", data: resp }
      });
    } catch (error) {
      throw error
    }
  },

  findOrCreate: async (req) => {
    try {
      const { customer_id, address_id, passenger_id, date, time, created_by } = req
      var objData = {
        customer_id: customer_id,
        address_id: address_id,
        passenger_id: passenger_id,
        date: date,
        time: time,
        created_by: created_by
      }
      console.log("objData")
      console.log(objData)

      const params = {
        pickup_id: pickup_id,
      };

      const insert = await Model.findOrCreate({ where: params, defaults: objData })
      console.log("insert")
      console.log(insert[1])

      // check is already registered or not
      if (!insert[1]) {
        throw ({ success: false, message: "Waybill exist! Please create with different value", data: {} })
      }
      
      return { success: true, message: "Waybill has success created", data: insert[0].dataValues }
    } catch (error) {
      console.log(error);
      throw (error)
    }
  },

  update: async (req) => {
    try {

      const { waybill_id, customer_id, address_id, passenger_id, date, time, updated_by } = req
      var objData = {
        waybill_id: waybill_id,
        customer_id: customer_id,
        address_id: address_id,
        passenger_id: passenger_id,
        date: date,
        time: time,
        updated_by: updated_by
      }
      console.log("objData")
      console.log(objData)

      const params = {
        waybill_id: waybill_id,
      };

      return Model.update(objData, {where: params} )
      .then(async () => { 
          return { success: true, message: "Waybill success changed", data: objData } })
      .catch((err) => { return { success: false, message: "Waybill failed change", data: err } });
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
            return { success: true, message: "This waybill not find", data: [] }
          } else {
            return { success: true, message: "This waybill success delete", data: [] }
          }
        })
        .catch((err) => {
          console.log(err);
          return { success: false, message: "Waybill failed to remove", data: err }
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
        { success: true, message: "Waybill success find", data: resp } : 
        { success: false, message: "Waybill not find!", data: {} }
      });
    } catch (error) {
      console.log(error);
      throw error
    }
  },

}