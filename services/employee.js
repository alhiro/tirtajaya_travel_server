const Model = require('../models/employee');
const ModelPackage = require('../models/package');
const ModelCar = require('../models/car');
const ModelCity = require('../models/city');
const ModelLevel = require('../models/level');
const ModelSender = require('../models/sender');
const ModelRecipient = require('../models/recipient');
const ModelCustomer = require('../models/customer');
const ModelAddress = require('../models/address');
const ModelCategory = require('../models/category');
const ModelGoSend = require('../models/go_send');

const sequelize = require("../config/sequelize");
const Sequelizes = require('sequelize');

const { count } = require('sequelize/lib/model');

module.exports =
{
  get: async (id) => {
    try {
      return await Model.findOne({
        where: {
          employee_id: id
        },
        include: [
          {
            model: ModelPackage,
          },
        ]
      }).then((resp) => {
        return (!resp) ? 
            { success: false, message: "Employee not find!", data: {} } : 
            { success: true, message: "Employee exist", data: resp }
      });
    } catch (error) {
      throw error
    }
  },

  driver: async (params) => {
    const Op = Sequelizes.Op;
    const { page, limit, search } = params;
    console.log(params)
    
    try {
      return await Model.findAll({
        where: {
          [Op.or]: [
            { name: { [Sequelizes.Op.iLike]: `%${search}%` } },
          ],
          level_id: 5
        },
        include: [
          {
            model: ModelCar,
          },
          {
            model: ModelCity,
          },
          {
            model: ModelLevel,
          },
          // {
          //   model: ModelPackage, 
          //   where: { 
          //     // go_send_id: {[Op.ne]: null}
          //     status_package: "Delivery"
          //   },
          //   include: [
          //     {
          //       model: ModelCategory,
          //     },
          //     {
          //       model: ModelCity,
          //     },
          //     {
          //       model: ModelGoSend,
          //       include: [ModelCar]
          //     },
          //     {
          //       model: ModelSender,
          //       include: [{
          //         model: ModelCustomer, 
          //         include: [ModelAddress]
          //       }],
          //     },
          //     {
          //       model: ModelRecipient,
          //       include: [{
          //         model: ModelCustomer, 
          //         include: [ModelAddress]
          //       }],
          //     },
          //   ]
          // },
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
              message: "Employee not find!",
              data: {},
              page: pages,
              count: pageCount,
              length: resp.length
            } : {
              success: true,
              message: "Employee success find",
              data: resp.slice(pages * limit - limit, pages * limit),
              page: pages,
              count: pageCount,
              length: resp.length
            }
          } else {
            return { 
              success: true,
              message: "Employee success find all",
              data: resp,
              page: pages,
              count: pageCount,
              length: resp.length
            }
          }
        } else {
          return { 
            success: true, message: "Employee empty!", data: {}, page: pages, count: pageCount, length: resp.length }
        }
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
            { name: { [Sequelizes.Op.iLike]: `%${search}%` } },
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
            model: ModelLevel,
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
              message: "Employee not find!",
              data: {},
              page: pages,
              count: pageCount,
              length: resp.length
            } : {
              success: true,
              message: "Employee success find",
              data: resp.slice(pages * limit - limit, pages * limit),
              page: pages,
              count: pageCount,
              length: resp.length
            }
          } else {
            return { 
              success: true,
              message: "Employee success find all",
              data: resp,
              page: pages,
              count: pageCount,
              length: resp.length
            }
          }
        } else {
          return { 
            success: true, message: "Employee empty!", data: {}, page: pages, count: pageCount, length: resp.length }
        }
      });
    } catch (error) {
      throw error
    }
  },

  findOrCreate: async (req) => {
    try {
      const { car_id, city_id, level_id, nik, name, photo, telp, log, created_by } = req
      var objData = {
        car_id: car_id,
        city_id: city_id,
        level_id: level_id,
        nik: nik,
        name: name,
        telp: telp,
        active: "TRUE",
        log: log,
        created_by: created_by
      }

      if (photo){
        objData.photo = photo;
      } 

      const insert = await Model.findOrCreate({ where: { name: name }, defaults: objData })

      // check is already registered or not
      if (!insert[1]) {
        throw ({ success: false, message: "Employee exist! Please create with different value", data: {} })
      }
      
      return { success: true, message: "Employee has success created", data: insert[0].dataValues }
    } catch (error) {
      console.log(error);
      throw (error)
    }
  },

  update: async (req) => {
    try {

      const { employee_id, car_id, city_id, level_id, nik, name, photo, telp, active, log, updated_at } = req
      var objData = {
        employee_id: employee_id,
        car_id: car_id,
        city_id: city_id,
        level_id: level_id,
        nik: nik,
        name: name,
        telp: telp,
        active: active,
        log: log,
        updated_at: updated_at
      }
      console.log(JSON.stringify(objData), "objData")

      if (photo){
        objData.photo = photo;
      } 

      return Model.update(objData,{where: {employee_id: employee_id}} )
      .then(async () => { 
          return { success: true, message: "Employee success changed", data: objData } })
      .catch((err) => { return { success: false, message: "Employee failed change", data: err } });
    } catch (error) {
      throw (error)
    }
  },

  delete: async (data) => {
    try {
      const { employee_id } = data;

      return Model.destroy({
        where: {
          employee_id: employee_id,
        },
      })
        .then(async (deleted) => {
          console.log('deleted')
          console.log(deleted)
          if (deleted == 0) {
            return { success: true, message: "This employee not find", data: [] }
          } else {
            return { success: true, message: "This employee success delete", data: [] }
          }
        })
        .catch((err) => {
          console.log(err);
          return { success: false, message: "Employee failed to remove", data: err }
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
            { username: { [Sequelizes.Op.iLike]: `%${params.username}%` } },
          ]
        },
        order: [["created_at", "ASC"]],
      }).then((resp) => {
        return (resp.length > 0) ? 
        { success: true, message: "Employee success find", data: resp } : 
        { success: false, message: "Employee not find!", data: {} }
      });
    } catch (error) {
      console.log(error);
      throw error
    }
  },

  searchByFilter: async (param) => {
    try {
      const { start, pageSize, orderBy, categoryID, latitude, longitude, address, serviceID, availableDate, rating, minPrice, maxPrice } = param;

      // var query = "CALL someprocedure(:userId,:status)";
      var query = "select * from sp_partner_search_get_list_paging(:p_start,:p_page_size,:p_order_by,:p_category_id,:p_latitude,:p_longitude,:p_address,:p_service_id,:p_available_date,:p_rating,:p_min_price,:p_max_price)";
      return sequelize.query(query, {
        replacements: {
          p_start: start,
          p_page_size: pageSize,
          p_order_by: orderBy,
          p_category_id: categoryID,
          p_latitude: latitude,
          p_longitude: longitude,
          p_address: address,
          p_service_id: serviceID,
          p_available_date: availableDate,
          p_rating: rating,
          p_min_price: minPrice,
          p_max_price: maxPrice
        }, type: sequelize.QueryTypes.SELECT
      }).then(results => {
        return results;
      });

    } catch (error) {
      console.log(error);
      throw error
    }
  },

}