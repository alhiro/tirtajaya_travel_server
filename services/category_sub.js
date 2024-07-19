const Model = require('../models/category_sub');
const ModelCategory = require('../models/category');

const sequelize = require("../config/sequelize");
const Sequelizes = require('sequelize');

const { count } = require('sequelize/lib/model');

module.exports =
{
  get: async (id) => {
    try {
      return await Model.findOne({
        where: {
          category_sub_id: id
        },
        include: [
          {
            model: ModelCategory,
          }
        ]
      }).then((resp) => {
        return (!resp) ? 
            { success: false, message: "Category sub not find!", data: {} } : 
            { success: true, message: "Category sub exist", data: resp }
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
        include: [
          {
            model: ModelCategory,
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
              message: "Category sub not find!",
              data: {},
              page: pages,
              count: pageCount,
              length: resp.length
            } : {
              success: true,
              message: "Category sub success find",
              data: resp.slice(pages * limit - limit, pages * limit),
              page: pages,
              count: pageCount,
              length: resp.length
            }
          } else {
            return { 
              success: true,
              message: "Category sub success find all",
              data: resp,
              page: pages,
              count: pageCount,
              length: resp.length
            }
          }
        } else {
          return { status: 200, success: true, message: "Category sub empty!", data: {}, page: pages, count: pageCount, length: resp.length }
        }
      });
    } catch (error) {
      throw error
    }
  },

  findOrCreate: async (req) => {
    try {
      const { category_id, name } = req
      var objData = {
        category_id: category_id,
        name: name
      }
      console.log("objData")
      console.log(objData)

      const params = {
        name: name,
      };

      const insert = await Model.findOrCreate({ where: params, defaults: objData })
      console.log("insert")
      console.log(insert[1])

      // check is already registered or not
      if (!insert[1]) {
        throw ({ success: false, message: "Category sub exist! Please create with different value", data: {} })
      }
      
      return { success: true, message: "Category sub has success created", data: insert[0].dataValues }
    } catch (error) {
      console.log(error);
      throw (error)
    }
  },

  update: async (req) => {
    try {

      const { category_sub_id, category_id, name } = req
      var objData = {
        category_sub_id: category_sub_id,
        category_id: category_id,
        name: name
      }
      console.log("objData")
      console.log(objData)

      const params = {
        category_sub_id: category_sub_id,
      };

      return Model.update(objData, { where: params })
      .then(async () => { 
          return { success: true, message: "Category sub success changed", data: objData } })
      .catch((err) => { return { success: false, message: "Category sub failed change", data: err } });
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
            return { success: true, message: "This Category sub not find", data: [] }
          } else {
            return { success: true, message: "This Category sub success delete", data: [] }
          }
        })
        .catch((err) => {
          console.log(err);
          return { success: false, message: "Category sub failed to remove", data: err }
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
        { success: true, message: "Category sub success find", data: resp } : 
        { success: false, message: "Category sub not find!", data: {} }
      });
    } catch (error) {
      console.log(error);
      throw error
    }
  },

}