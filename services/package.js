const Model = require('../models/package');
const ModelSender = require('../models/sender');
const ModelRecipient = require('../models/recipient');
const ModelCustomer = require('../models/customer');
const ModelAddress = require('../models/address');
const ModelCity = require('../models/city');
const ModelEmployee = require('../models/employee');
const ModelCategory = require('../models/category');
const ModelGoSend = require('../models/go_send');
const ModelCar = require('../models/car');

const sequelize = require("../config/sequelize");
const Sequelizes = require('sequelize');
const moment = require("moment");

const { count } = require('sequelize/lib/model');
const { includes } = require('lodash');

const now = moment()
  .utcOffset(7)
  .format("YYMMDD");

module.exports =
{
  get: async (id) => {
    try {
      return await Model.findOne({
        where: {
          package_id: id
        },
        include: [
          {
            model: ModelSender, include: [ModelCustomer]
          },
          {
            model: ModelRecipient, include: [ModelCustomer]
          },
          {
            model: ModelCity,
          },
          {
            model: ModelEmployee,
          },
          {
            model: ModelCategory,
          },
          {
            model: ModelGoSend,
          }
        ]
      }).then((resp) => {
        return (!resp) ? 
            { success: false, message: "Package not find!", data: {} } : 
            { success: true, message: "Package exist", data: resp }
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
        // attributes: ['id',
        //             'name',
        //             'level',
        // ],
        include: [
          {
            model: ModelSender, include: [{
              model: ModelCustomer, include: [ModelAddress]
            }]
          },
          {
            model: ModelRecipient, include: [{
              model: ModelCustomer, include: [ModelAddress]
            }]
          },
          {
            model: ModelCity,
          },
          {
            model: ModelCategory,
          },
          {
            model: ModelGoSend,
            include: [
              {
                model: ModelCar,
              },
              {
                model: ModelEmployee,
              },
            ],
          },
        ],
        order: [
          ["resi_number", "ASC"]
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
              message: "Package not find!",
              data: {},
              page: pages,
              count: pageCount,
              length: resp.length
            } : {
              success: true,
              message: "Package success find",
              data: resp.slice(pages * limit - limit, pages * limit),
              page: pages,
              count: pageCount,
              length: resp.length
            }
          } else {
            return { 
              success: true,
              message: "Package success find all",
              data: resp,
              page: pages,
              count: pageCount,
              length: resp.length
            }
          }
        } else {
          return { 
            success: true, message: "Package empty!", data: {}, page: pages, count: pageCount, length: resp.length }
        }
      });
    } catch (error) {
      throw error
    }
  },

  findOrCreate: async (req) => {
    try {
      const { sender_id, recipient_id, city_id, employee_id, category_id, courier_id, 
        go_send_id, description, cost, koli, discount, payment, origin_from, level, request, request_description, note, status, status_package, 
        resi_number, photo, print, move_time, book_date, send_date, check_payment, check_sp, check_date_sp, taking_time, taking_by, taking_status, office, created_by, created_at  } = req

      const lastUpdate = await Model.findAll({
        limit: 1,
        order: [['updatedAt', 'DESC']]
      })
      var dataLast = lastUpdate[0]
      console.log(dataLast)

      var bookDate = new Date(book_date)
      const bookDateFormat = moment(bookDate)
        .utcOffset(7)
        .format("YYMMDD");
     
      let formatresnumber = '';
      // Convert intValue to a string and pad with leading zeros

      if (dataLast) {
        console.log("generate new resi")
        var val = dataLast.package_id;
        var incrementvalue = val.toString().padStart(3, '0');
        // generate resi number by format malang MLGU240703035 and surabaya SBYU240703043
        if (city_id == 1) {
          formatresnumber = "MLGU" + bookDateFormat + (incrementvalue + 1)
        } else if (city_id == 2) {
          formatresnumber = "SBYU" + bookDateFormat + (incrementvalue + 1)
        }
      } else {
        console.log("generate first resi")
        var val = 1;
        var incrementvalue = val.toString().padStart(3, '0');
        // generate resi number by format malang MLGU240703035 and surabaya SBYU240703043
        if (city_id == 1) {
          formatresnumber = "MLGU" + now + incrementvalue
        } else if (city_id == 2) {
          formatresnumber = "SBYU" + now + incrementvalue
        } 
      }
      
      var objData = {
        sender_id: sender_id,
        recipient_id: recipient_id,
        employee_id: employee_id,
        category_id: category_id,
        courier_id: courier_id,
        go_send_id: go_send_id,
        city_id: city_id,
        description: description,
        cost: cost,
        koli: koli,
        discount: discount,
        payment: payment,
        origin_from: origin_from,
        level: level,
        request: request,
        request_description: request_description,
        note: note,
        status: status,
        status_package: status_package,
        resi_number: formatresnumber,
        photo: photo,
        print: print,
        move_time: move_time,
        book_date: book_date,
        send_date: send_date,
        check_payment: check_payment,
        check_sp: check_sp,
        check_date_sp: check_date_sp,
        taking_time: taking_time,
        taking_by: taking_by,
        taking_status: taking_status,
        office: office,
        created_by: created_by,
      }

      // const params = {
      //   sender_id: sender_id,
      // };

      const insert = await Model.create(objData)

      // check is already registered or not
      // if (!insert[1]) {
      //   throw ({ success: false, message: "Package exist! Please create with different value", data: {} })
      // }
      
      return { success: true, message: "Package has success created", data: insert }
    } catch (error) {
      console.log(error);
      throw (error)
    }
  },

  update: async (req) => {
    try {

      const { package_id, sender_id, recipient_id, city_id, employee_id, category_id, courier_id, 
        go_send_id, description, cost, koli, discount, payment, origin_from, level, request, request_description, note, status, status_package, 
        resi_number, photo, print, move_time, book_date, send_date, check_payment, check_sp, check_date_sp, taking_time, taking_by, taking_status, office, updated_by, updated_at  } = req

      const params = {
        package_id: package_id,
      };

      const lastUpdate = await Model.findAll({
        limit: 1,
        where: params,
        order: [ [ 'updatedAt', 'DESC' ]]
      })
      var dataLast = lastUpdate[0]?.dataValues
      console.log(book_date)
      console.log(dataLast?.book_date)
      
      var oldDate = new Date(dataLast?.book_date)
      const oldDateFormat = moment(oldDate)
        .utcOffset(7)
        .format("YYMMDD");
      var newDate = new Date(book_date)
      const newDateFormat = moment(newDate)
        .utcOffset(7)
        .format("YYMMDD");

      var formatresnumber = '';
      // Convert intValue to a string and pad with leading zeros
      var oldVal = dataLast?.package_id;
      var oldvalue = oldVal.toString().padStart(3, '0');

      console.log("city_id")
      console.log(city_id)
      if (oldDate.getTime() !== newDate.getTime()) {
        console.log("generate new resi")
        // generate resi number by format malang MLGU240703035 and surabaya SBYU240703043
        if (city_id == 1) {
          formatresnumber = "MLGU" + newDateFormat + oldvalue
        } else if (city_id == 2) {
          formatresnumber = "SBYU" + newDateFormat + oldvalue
        }
      } else {
        if (city_id == 1) {
          console.log("keep old resi malang")
          formatresnumber = "MLGU" + oldDateFormat + oldvalue
        } else if (city_id ==    2) {
          console.log("keep old resi surabaya")
          formatresnumber = "SBYU" + oldDateFormat + oldvalue
        }
      }
      console.log("resii update")
      console.log(formatresnumber)
      
      var objData = {
        package_id: package_id,
        sender_id: sender_id,
        recipient_id: recipient_id,
        city_id: city_id,
        employee_id: employee_id,
        category_id: category_id,
        courier_id: courier_id,
        go_send_id: go_send_id,
        description: description,
        cost: cost,
        koli: koli,
        discount: discount,
        payment: payment,
        origin_from: origin_from,
        level: level,
        request: request,
        request_description: request_description,
        note: note,
        status: status,
        status_package: status_package,
        resi_number: formatresnumber,
        photo: photo,
        print: print,
        move_time: move_time,
        book_date: book_date,
        send_date: send_date,
        check_payment: check_payment,
        check_sp: check_sp,
        check_date_sp: check_date_sp,
        taking_time: taking_time,
        taking_by: taking_by,
        taking_status: taking_status,
        office: office,
        updated_by: updated_by,
      }
      console.log("objData")
      console.log(objData)

      // const update = await Model.find(objData, {where: params})
      // console.log("update")
      // console.log(update)

      // // check is already registered or not
      // if (!update[1]) {
      //   throw ({ success: false, message: "Package exist! Please update with different value", data: {} })
      // }

      return Model.update(objData, {where: params} )
      .then(async () => { 
          return { success: true, message: "Package success changed", data: objData } })
      .catch((err) => { return { success: false, message: "Package failed change", data: err } });
    } catch (error) {
      throw (error)
    }
  },

  patch: async (req) => {
    try {

      const { package_id, sender_id, recipient_id, city_id, employee_id, category_id, courier_id, 
        go_send_id, description, cost, koli, discount, payment, origin_from, level, request, request_description, note, status, status_package, 
        resi_number, photo, print, move_time, book_date, send_date, check_payment, check_sp, check_date_sp, taking_time, taking_by, taking_status, office, updated_by, updated_at  } = req

      const params = {
        package_id: package_id,
      };

      const lastUpdate = await Model.findAll({
        limit: 1,
        where: params,
        order: [ [ 'updatedAt', 'DESC' ]]
      })
      var dataLast = lastUpdate[0]?.dataValues
      console.log(book_date)
      console.log(dataLast?.book_date)
      
      var oldDate = new Date(dataLast?.book_date)
      const oldDateFormat = moment(oldDate)
        .utcOffset(7)
        .format("YYMMDD");
      var newDate = new Date(book_date)
      const newDateFormat = moment(newDate)
        .utcOffset(7)
        .format("YYMMDD");

      var formatresnumber = '';
      // Convert intValue to a string and pad with leading zeros
      var val = package_id;
      var oldvalue = val.toString().padStart(3, '0');

      console.log("city_id")
      console.log(city_id)
      if (oldDate.getTime() !== newDate.getTime()) {
        console.log("generate new resi")
        // generate resi number by format malang MLGU240703035 and surabaya SBYU240703043
        if (city_id == 1) {
          formatresnumber = "MLGU" + newDateFormat + oldvalue
        } else if (city_id == 2) {
          formatresnumber = "SBYU" + newDateFormat + oldvalue
        }
      } else {
        if (city_id == 1) {
          console.log("keep old resi malang")
          formatresnumber = "MLGU" + oldDateFormat + oldvalue
        } else if (city_id ==    2) {
          console.log("keep old resi surabaya")
          formatresnumber = "SBYU" + oldDateFormat + oldvalue
        }
      }
      console.log("resii update")
      console.log(formatresnumber)
      
      var objData = {
        package_id: package_id,
        sender_id: sender_id,
        recipient_id: recipient_id,
        city_id: city_id,
        employee_id: employee_id,
        category_id: category_id,
        courier_id: courier_id,
        go_send_id: go_send_id,
        description: description,
        cost: cost,
        koli: koli,
        discount: discount,
        payment: payment,
        origin_from: origin_from,
        level: level,
        request: request,
        request_description: request_description,
        note: note,
        status: status,
        status_package: status_package,
        resi_number: formatresnumber,
        photo: photo,
        print: print,
        move_time: move_time,
        book_date: book_date,
        send_date: send_date,
        check_payment: check_payment,
        check_sp: check_sp,
        check_date_sp: check_date_sp,
        taking_time: taking_time,
        taking_by: taking_by,
        taking_status: taking_status,
        office: office,
        updated_by: updated_by,
      }
      console.log("objData")
      console.log(objData)

      // const update = await Model.find(objData, {where: params})
      // console.log("update")
      // console.log(update)

      // // check is already registered or not
      // if (!update[1]) {
      //   throw ({ success: false, message: "Package exist! Please update with different value", data: {} })
      // }

      return Model.update(objData, {where: params} )
      .then(async () => { 
          return { success: true, message: "Package success changed", data: objData } })
      .catch((err) => { return { success: false, message: "Package failed change", data: err } });
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
            return { success: true, message: "This Package not find", data: [] }
          } else {
            return { success: true, message: "This Package success delete", data: [] }
          }
        })
        .catch((err) => {
          console.log(err);
          return { success: false, message: "Package failed to remove", data: err }
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
        order: [["level", "ASC"]],
      }).then((resp) => {
        return (resp.length > 0) ? 
        { success: true, message: "Package success find", data: resp } : 
        { success: false, message: "Package not find!", data: {} }
      });
    } catch (error) {
      console.log(error);
      throw error
    }
  },

}