const Model = require('../models/go_send');
const ModelPackage = require('../models/package');
const ModelCar = require('../models/car');
const ModelCity = require('../models/city');
const ModelSender = require('../models/sender');
const ModelRecipient = require('../models/recipient');
const ModelCustomer = require('../models/customer');
const ModelAddress = require('../models/address');
const ModelCategory = require('../models/category');
const ModelEmployee = require('../models/employee');

const sequelize = require("../config/sequelize");
const Sequelizes = require('sequelize');

const { count } = require('sequelize/lib/model');

module.exports =
{
  get: async (id) => {
    try {
      return await Model.findOne({
        where: {
          go_send_id: id
        },
        include: [
          {
            model: ModelPackage,
          }
        ]
      }).then((resp) => {
        return (!resp) ? 
            { success: false, message: "Go send not find!", data: {} } : 
            { success: true, message: "Go send exist", data: resp }
      });
    } catch (error) {
      throw error
    }
  },

  list: async (params) => {
    const Op = Sequelizes.Op;
    const { page, limit, search } = params;
    console.log(params)
    try {
      return await Model.findAll({
        where: {
          [Op.or]: [
            { sp_package: { [Sequelizes.Op.iLike]: `%${search}%` } },
          ]
        },
        include: [
          {
            model: ModelCar,
          },
          {
            model: ModelCity,
          },
          {
            model: ModelEmployee,
          },
          {
            model: ModelPackage, 
            where: {
              // go_send_id: {[Op.ne]: null}
              status_package: "Delivery",
            },
            include: [
              {
                model: ModelCategory,
              },
              {
                model: ModelCity,
              },
              {
                model: ModelSender,
                include: [{
                  model: ModelCustomer, 
                  include: [ModelAddress]
                }],
              },
              {
                model: ModelRecipient,
                include: [{
                  model: ModelCustomer, 
                  include: [ModelAddress]
                }],
              },
            ]
          },
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
              message: "Gosend not find!",
              data: {},
              page: pages,
              count: pageCount,
              length: resp.length
            } : {
              success: true,
              message: "Gosend success find",
              data: resp.slice(pages * limit - limit, pages * limit),
              page: pages,
              count: pageCount,
              length: resp.length
            }
          } else {
            return { 
              success: true,
              message: "Gosend success find all",
              data: resp,
              page: pages,
              count: pageCount,
              length: resp.length
            }
          }
        } else {
          return { 
            success: true, message: "Gosend empty!", data: {}, page: pages, count: pageCount, length: resp.length }
        }
      });
    } catch (error) {
      throw error
    }
  },

  findOrCreate: async (req) => {
    try {
      const { employee_id, package_id, car_id, city_id, send_time, send_date, sp_number, sp_package, 
        sp_passenger, bsd, bsd_passenger, box, box_bsd, description, status, created_by } = req
      var objData = {
        employee_id: employee_id,
        package_id: package_id,
        car_id: car_id,
        city_id: city_id,
        send_time: send_time,
        send_date: send_date,
        sp_number: sp_number,
        sp_package: sp_package,
        sp_passenger: sp_passenger,
        bsd: bsd,
        bsd_passenger: bsd_passenger,
        box: box,
        box_bsd: box_bsd,
        description: description,
        status: status,
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
        throw ({ success: false, message: "Go send exist! Please create with different value", data: {} })
      }
      
      return { success: true, message: "Go send has success created", data: insert[0].dataValues }
    } catch (error) {
      console.log(error);
      throw (error)
    }
  },

  update: async (req) => {
    try {

      const { go_send_id, employee_id, package_id, car_id, city_id, send_time, send_date, sp_number, sp_package, 
        sp_passenger, bsd, bsd_passenger, box, box_bsd, description, status, updated_by } = req
      var objData = {
        go_send_id: go_send_id,
        employee_id: employee_id,
        package_id: package_id,
        car_id: car_id,
        city_id: city_id,
        send_time: send_time,
        send_date: send_date,
        sp_number: sp_number,
        sp_package: sp_package,
        sp_passenger: sp_passenger,
        bsd: bsd,
        bsd_passenger: bsd_passenger,
        box: box,
        box_bsd: box_bsd,
        description: description,
        status: status,
        updated_by: updated_by
      }
      console.log("objData")
      console.log(objData)

      const params = {
        go_send_id: go_send_id,
      };

      return Model.update(objData, { where: params })
      .then(async () => { 
          return { success: true, message: "Go send success changed", data: objData } })
      .catch((err) => { return { success: false, message: "Go send failed change", data: err } });
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
            return { success: true, message: "This Go send not find", data: [] }
          } else {
            return { success: true, message: "This Go send success delete", data: [] }
          }
        })
        .catch((err) => {
          console.log(err);
          return { success: false, message: "Go send failed to remove", data: err }
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
        { success: true, message: "Go send success find", data: resp } : 
        { success: false, message: "Go send not find!", data: {} }
      });
    } catch (error) {
      console.log(error);
      throw error
    }
  },

}