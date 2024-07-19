const Model = require('../models/customer');
const ModelBusiness = require('../models/business');
const ModelCompany = require('../models/company');
const ModelAddress = require('../models/address');

const sequelize = require("../config/sequelize");
const Sequelizes = require('sequelize');

const { count } = require('sequelize/lib/model');

module.exports =
{
  get: async (id) => {
    try {
      return await Model.findOne({
        where: {
          customer_id: id
        },
        include: [
          {
            model: ModelBusiness,
          },
          {
            model: ModelCompany,
          },
          {
            model: ModelAddress,
          }
        ],
      }).then((resp) => {
        return (!resp) ? 
            { success: false, message: "Customer not find!", data: {} } : 
            { success: true, message: "Customer exist", data: resp }
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
            model: ModelBusiness,
          },
          {
            model: ModelCompany,
          },
          {
            model: ModelAddress,
          }
        ],
        order: [
          ["updated_at", "DESC"]
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
              message: "Customer not find!",
              data: {},
              page: pages,
              count: pageCount,
              length: resp.length
            } : {
              success: true,
              message: "Customer success find",
              data: resp.slice(pages * limit - limit, pages * limit),
              page: pages,
              count: pageCount,
              length: resp.length
            }
          } else {
            return { 
              success: true,
              message: "Customer success find all",
              data: resp,
              page: pages,
              count: pageCount,
              length: resp.length
            }
          }
        } else {
          return { 
            success: true, message: "Customer empty!", data: {}, page: pages, count: pageCount, length: resp.length }
        }
      });
    } catch (error) {
      throw error
    }
  },

  findOrCreate: async (req) => {
    try {
      const { business_id, company_id, name, telp, admin, address, status, created_by } = req
      var objData = {
        business_id: business_id,
        company_id: company_id,
        name: name,
        telp: telp,
        admin: admin,
        address: address,
        status: status,
        created_by: created_by
      }

      const insert = await Model.findOrCreate({ where: { name: name, telp: telp }, defaults: objData })

      // check is already registered or not
      if (!insert[1]) {
        throw ({ success: false, message: "Customer exist! Please create with different value", data: {} })
      }
      
      return { success: true, message: "Customer has success created", data: insert[0].dataValues }
    } catch (error) {
      console.log(error);
      throw (error)
    }
  },

  update: async (req) => {
    try {

      const { customer_id, business_id, company_id, name, telp, admin, address, status, updated_by } = req
      var objData = {
        customer_id: customer_id,
        business_id: business_id,
        company_id: company_id,
        name: name,
        telp: telp,
        admin: admin,
        address: address,
        status: status,
        updated_by: updated_by
      }
      console.log(JSON.stringify(objData), "objData")

      return Model.update(objData,{where: {customer_id: customer_id}} )
      .then(async () => { 
          return { success: true, message: "Customer success changed", data: objData } })
      .catch((err) => { return { success: false, message: "Customer failed change", data: err } });
    } catch (error) {
      throw (error)
    }
  },

  delete: async (data) => {
    try {
      const { customer_id } = data;

      return Model.destroy({
        where: {
          customer_id: customer_id,
        },
      })
        .then(async (deleted) => {
          console.log('deleted')
          console.log(deleted)
          if (deleted == 0) {
            return { success: true, message: "This Customer not find", data: [] }
          } else {
            return { success: true, message: "This Customer success delete", data: [] }
          }
        })
        .catch((err) => {
          console.log(err);
          return { success: false, message: "Customer failed to remove", data: err }
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
        { success: true, message: "Customer success find", data: resp } : 
        { success: false, message: "Customer not find!", data: {} }
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