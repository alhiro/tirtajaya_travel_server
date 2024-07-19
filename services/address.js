const Model = require('../models/address');
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
          address_id: id
        },
        include: [
          {
            model: ModelCustomer,
          }
        ]
      }).then((resp) => {
        return (!resp) ? 
            { success: false, message: "Address not find!", data: {} } : 
            { success: true, message: "Address exist", data: resp }
      });
    } catch (error) {
      throw error
    }
  },

  all: async () => {
    try {
      return await Model.findAll({
        order: [
          ["name", "ASC"]
        ]
      }).then((resp) => {
        return (!resp) ? 
            { success: true, message: "Address not find!", data: {} } : 
            { success: true, message: "Address success find all", data: resp }
      });
    } catch (error) {
      throw error
    }
  },

  list: async (params) => {
    const { page, limit } = params;
    console.log(params)

    try {
      return await Model.findAll({
        // where: {
        //   active: 'TRUE'
        // },
        // attributes: ['address_id',
        //             'name',
        // ],
        include: [
          {
            model: ModelCustomer,
          }
        ],
        order: [
          ["name", "ASC"]
        ]
      }).then((resp) => {
        const pageCount = Math.ceil(resp.length / limit);
        let pages = parseInt(page);
        if (!pages) { pages }
        if (pages > pageCount) {
          pages = pageCount
        }

        if (resp.length > 0) {
          if (params.page !== undefined && params.limit !== undefined) {  
            return (!resp) ? {
              success: true,
              message: "Address not find!",
              data: {},
              page: pages,
              count: pageCount,
              length: resp.length
            } : {
              success: true,
              message: "Address success find",
              data: resp.slice(pages * limit - limit, pages * limit),
              page: pages,
              count: pageCount,
              length: resp.length
            }
          } else {
            return { 
              success: true,
              message: "Address success find all",
              data: resp,
              page: pages,
              count: pageCount,
              length: resp.length
            }
          }
        } else {
          return { status: 200, success: true, message: "Address empty!", data: {}, page: pages, count: pageCount, length: resp.length }
        }
      });
    } catch (error) {
      throw error
    }
  },

  findOrCreate: async (req) => {
    try {
      const { customer_id, name, address, telp, defaults, longitude, latitude, zoom, description, used, created_by } = req
      var objData = {
        customer_id: customer_id,
        name: name,
        address: address,
        telp: telp,
        default: defaults,
        longitude: longitude,
        latitude: latitude,
        zoom: zoom,
        description: description,
        used: used,
        created_by: created_by
      }
      console.log("objData")
      console.log(objData)

      const params = {
        name: name,
        telp: telp
      };

      const insert = await Model.findOrCreate({ where: params, defaults: objData })
      console.log("insert")
      console.log(insert[1])

      // check is already registered or not
      if (!insert[1]) {
        throw ({ success: false, message: "Address exist! Please create with different value", data: {} })
      }
      
      return { success: true, message: "Address has success created", data: insert[0].dataValues }
    } catch (error) {
      console.log(error);
      throw (error)
    }
  },

  update: async (req) => {
    try {

      const { address_id, customer_id, name, address, telp, defaults, longitude, latitude, zoom, description, used, updated_by } = req
      var objData = {
        address_id: address_id,
        customer_id: customer_id,
        name: name,
        address: address,
        telp: telp,
        longitude: longitude,
        latitude: latitude,
        zoom: zoom,
        description: description,
        used: used,
        updated_by: updated_by
      }
      console.log("objData")
      console.log(objData)

      // Set default to false for all records
      if (defaults) {
        objData.default = defaults

        await Model.update(
          { default: false },
          { where: {customer_id: customer_id} }
        );
      }

      const params = {
        address_id: address_id,
      };

      return Model.update(objData, { where: params }).then(async () => {
        return { success: true, message: "Address success changed", data: objData }
      }).catch((err) => { return { success: false, message: "Address failed change", data: err } });
    } catch (error) {
      throw (error)
    }
  },

  updateObject: async (req) => {
    try {
      const data = req.find((item) => item.default === true);
      console.log(data)

      // Set active to false for all records
      await Model.update(
        { default: false },
        { where: data.customer_id }
      );

      var objData = {
        default: data.default,
      }

      const params = {
        address_id: data.address_id,
      };

      return Model.update(objData, { where: params }).then(async () => {
          return { success: true, message: "Address success changed", data: data }
        }).catch((err) => { return { success: false, message: "Address failed change", data: err } });
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
            return { success: true, message: "This Address not find", data: [] }
          } else {
            return { success: true, message: "This Address success delete", data: [] }
          }
        })
        .catch((err) => {
          console.log(err);
          return { success: false, message: "Address failed to remove", data: err }
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
            { name: { [Sequelizes.Op.iLike]: `%${params.name}%` } },
          ]
        },
        order: [["created_at", "ASC"]],
      }).then((resp) => {
        return (resp.length > 0) ? 
        { success: true, message: "Address success find", data: resp } : 
        { success: false, message: "Address not find!", data: {} }
      });
    } catch (error) {
      console.log(error);
      throw error
    }
  },

}