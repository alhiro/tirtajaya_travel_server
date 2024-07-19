const Model = require('../models/sender');
const ModelPackage = require('../models/package');
const ModelCustomer = require('../models/customer');

const sequelize = require("../config/sequelize");
const Sequelizes = require('sequelize');

const { count } = require('sequelize/lib/model');

module.exports =
{
  get: async (id) => {
    try {
      return await Model.findOne({
        where: {
          sender_id: id
        },
        include: [
          {
            model: ModelPackage,
          }
        ]
      }).then((resp) => {
        return (!resp) ? 
            { success: false, message: "Sender not find!", data: {} } : 
            { success: true, message: "Sender exist", data: resp }
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
        include: [
          {
            model: ModelCustomer,
          }
        ],
        order: [
          ["updated_at", "DESC"]
        ]
      }).then((resp) => {
        return (!resp) ? 
            { success: false, message: "Sender not find!", data: {} } : 
            { success: true, message: "Sender success find", data: resp }
      });
    } catch (error) {
      throw error
    }
  },

  findOrCreate: async (req) => {
    try {
      const { customer_id, package_id, date, time, created_by } = req
      var objData = {
        customer_id: customer_id,
        package_id: package_id,
        date: date,
        time: time,
        created_by: created_by
      }
      console.log("objData")
      console.log(objData)

      // const params = {
      //   package_id: package_id,
      // };

      const insert = await Model.create(objData)
      console.log("insert")
      console.log(insert[1])

      // check is already registered or not
      // if (!insert[1]) {
      //   throw ({ success: false, message: "Sender exist! Please create with different value", data: {} })
      // }
      
      return { success: true, message: "Sender has success created", data: insert }
    } catch (error) {
      console.log(error);
      throw (error)
    }
  },

  update: async (req) => {
    try {

      const { sender_id, customer_id, package_id, name, address, telp, longitude, latitude, zoom, date, time, updated_by } = req
      var objData = {
        sender_id: sender_id,
        customer_id: customer_id,
        package_id: package_id,
        // name: name,
        // address: address,
        // telp: telp,
        // longitude: longitude,
        // latitude: latitude,
        // zoom: zoom,
        date: date,
        time: time,
        updated_by: updated_by
      }
      console.log("objData")
      console.log(objData)

      const params = {
        sender_id: sender_id,
      };

      return Model.update(objData, {where: params} )
      .then(async () => { 
          return { success: true, message: "Sender success changed", data: objData } })
      .catch((err) => { return { success: false, message: "Sender failed change", data: err } });
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
            return { success: true, message: "This Sender not find", data: [] }
          } else {
            return { success: true, message: "This Sender success delete", data: [] }
          }
        })
        .catch((err) => {
          console.log(err);
          return { success: false, message: "Sender failed to remove", data: err }
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
        { success: true, message: "Sender success find", data: resp } : 
        { success: false, message: "Sender not find!", data: {} }
      });
    } catch (error) {
      console.log(error);
      throw error
    }
  },

}