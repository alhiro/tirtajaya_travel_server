const Model = require('../models/car');

const sequelize = require("../config/sequelize");
const Sequelizes = require('sequelize');

const { count } = require('sequelize/lib/model');

module.exports =
{
  get: async (id) => {
    try {
      return await Model.findOne({
        where: {
          car_id: id
        },
      }).then((resp) => {
        return (!resp) ? 
            { success: false, message: "Car not find!", data: {} } : 
            { success: true, message: "Car exist", data: resp }
      });
    } catch (error) {
      throw error
    }
  },

  list: async params => {
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
              message: "Car not find!",
              data: {},
              page: pages,
              count: pageCount,
              length: resp.length
            } : {
              success: true,
              message: "Car success find",
              data: resp.slice(pages * limit - limit, pages * limit),
              page: pages,
              count: pageCount,
              length: resp.length
            }
          } else {
            return { 
              success: true,
              message: "Car success find all",
              data: resp,
              page: pages,
              count: pageCount,
              length: resp.length
            }
          }
        } else {
          return { 
            success: true, message: "Car empty!", data: {}, page: pages, count: pageCount, length: resp.length }
        }
      });
    } catch (error) {
      throw error
    }
  },

  findOrCreate: async (req) => {
    try {
      const { number_plat, car_number, name, photo } = req
      var objData = {
        number_plat: number_plat,
        car_number: car_number,
        name: name
      }
      console.log("objData")
      console.log(objData)

      if (photo){
        objData.photo = photo;
      } 

      const params = {
        number_plat: number_plat,
      };

      const insert = await Model.findOrCreate({ where: params, defaults: objData })
      console.log("insert")
      console.log(insert[1])

      // check is already registered or not
      if (!insert[1]) {
        throw ({ success: false, message: "Car exist! Please create with different value", data: {} })
      }
      
      return { success: true, message: "Car has success created", data: insert[0].dataValues }
    } catch (error) {
      console.log(error);
      throw (error)
    }
  },

  update: async (req) => {
    try {

      const { car_id, number_plat, car_number, name, photo } = req
      var objData = {
        car_id: car_id,
        number_plat: number_plat,
        car_number: car_number,
        name: name
      }
      console.log("objData")
      console.log(objData)

      if (photo){
        objData.photo = photo;
      } 

      const params = {
        car_id: car_id,
      };

      return Model.update(objData, { where: params })
      .then(async () => { 
          return { success: true, message: "Car success changed", data: objData } })
      .catch((err) => { return { success: false, message: "Car failed change", data: err } });
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
            return { success: true, message: "This Car not find", data: [] }
          } else {
            return { success: true, message: "This Car success delete", data: [] }
          }
        })
        .catch((err) => {
          console.log(err);
          return { success: false, message: "Car failed to remove", data: err }
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
        { success: true, message: "Car success find", data: resp } : 
        { success: false, message: "Car not find!", data: {} }
      });
    } catch (error) {
      console.log(error);
      throw error
    }
  },

}