const Model = require('../models/destination');
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
          destination_id: id
        },
      }).then((resp) => {
        return (!resp) ? 
            { success: false, message: "Destination not find!", data: {} } : 
            { success: true, message: "Destination exist", data: resp }
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
            { success: false, message: "Destination not find!", data: {} } : 
            { success: true, message: "Destination success find", data: resp }
      });
    } catch (error) {
      throw error
    }
  },

  findOrCreate: async (req) => {
    try {
      const { address_id, passenger_id, created_by } = req
      var objData = {
        address_id: address_id,
        passenger_id: passenger_id,
        created_by: created_by
      }
      console.log("objData")
      console.log(objData)

      const params = {
        address_id: address_id,
      };

      const insert = await Model.findOrCreate({ where: params, defaults: objData })
      console.log("insert")
      console.log(insert[1])

      // check is already registered or not
      if (!insert[1]) {
        throw ({ success: false, message: "Destination exist! Please create with different value", data: {} })
      }
      
      return { success: true, message: "Destination has success created", data: insert[0].dataValues }
    } catch (error) {
      console.log(error);
      throw (error)
    }
  },

  update: async (req) => {
    try {

      const { destination_id, address_id, passenger_id, updated_by } = req
      var objData = {
        destination_id: destination_id,
        address_id: address_id,
        passenger_id: passenger_id,
        updated_by: updated_by
      }
      console.log("objData")
      console.log(objData)

      const params = {
        destination_id: destination_id,
      };

      return Model.update(objData, {where: params} )
      .then(async () => { 
          return { success: true, message: "Destination success changed", data: objData } })
      .catch((err) => { return { success: false, message: "Destination failed change", data: err } });
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
            return { success: true, message: "This destination not find", data: [] }
          } else {
            return { success: true, message: "This destination success delete", data: [] }
          }
        })
        .catch((err) => {
          console.log(err);
          return { success: false, message: "Destination failed to remove", data: err }
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
        { success: true, message: "Destination success find", data: resp } : 
        { success: false, message: "Destination not find!", data: {} }
      });
    } catch (error) {
      console.log(error);
      throw error
    }
  },

}