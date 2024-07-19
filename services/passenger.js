const Model = require('../models/passenger');
const ModelWaybill = require('../models/waybill');
const ModelDestination = require('../models/destination');
const ModelEmployee = require('../models/employee');
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
          passenger_id: id
        },
        include: [
          {
            model: ModelWaybill,
          },
          {
            model: ModelDestination,
          },
          {
            model: ModelEmployee,
          },
          {
            model: ModelGoSend,
          }
        ]
      }).then((resp) => {
        return (!resp) ? 
            { success: false, message: "Passenger not find!", data: {} } : 
            { success: true, message: "Passenger exist", data: resp }
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
            { success: false, message: "Passenger not find!", data: {} } : 
            { success: true, message: "Passenger success find", data: resp }
      });
    } catch (error) {
      throw error
    }
  },

  findOrCreate: async (req) => {
    try {
      const { passenger_id, waybill_id, destination_id, employee_id, go_send_id, tariff, discount, 
        agent_commission, other_fee, total_passenger, payment, status, note, description, resi_number, cancel, move,
        position, charter, check_payment, created_by, created_at  } = req
      var objData = {
        passenger_id: passenger_id,
        waybill_id: waybill_id,
        destination_id: destination_id,
        employee_id: employee_id,
        go_send_id: go_send_id,
        tariff: tariff,
        discount: discount,
        agent_commission: agent_commission,
        other_fee: other_fee,
        total_passenger: total_passenger,
        payment: payment,
        status: status,
        note: note,
        description: description,
        resi_number: resi_number,
        cancel: cancel,
        move: move,
        position: position,
        charter: charter,
        check_payment: check_payment,
        created_by: created_by,
        created_at: created_at
      }

      // const params = {
      //   sender_id: sender_id,
      // };

      const insert = await Model.create(objData)

      // check is already registered or not
      // if (!insert[1]) {
      //   throw ({ success: false, message: "Passenger exist! Please create with different value", data: {} })
      // }
      
      return { success: true, message: "Passenger has success created", data: insert }
    } catch (error) {
      console.log(error);
      throw (error)
    }
  },

  update: async (req) => {
    try {

      const { passenger_id, waybill_id, destination_id, employee_id, go_send_id, tariff, discount, 
        agent_commission, other_fee, total_passenger, payment, status, note, description, resi_number, cancel, move,
        position, charter, check_payment, updated_by, updated_at  } = req
      var objData = {
        passenger_id: passenger_id,
        waybill_id: waybill_id,
        destination_id: destination_id,
        employee_id: employee_id,
        go_send_id: go_send_id,
        tariff: tariff,
        discount: discount,
        agent_commission: agent_commission,
        other_fee: other_fee,
        total_passenger: total_passenger,
        payment: payment,
        status: status,
        note: note,
        description: description,
        resi_number: resi_number,
        cancel: cancel,
        move: move,
        position: position,
        charter: charter,
        check_payment: check_payment,
        updated_by: updated_by,
        updated_at: updated_at
      }
      console.log(JSON.stringify(objData), "objData")

      const params = {
        passenger_id: passenger_id,
      };

      // const update = await Model.find(objData, {where: params})
      // console.log("update")
      // console.log(update)

      // // check is already registered or not
      // if (!update[1]) {
      //   throw ({ success: false, message: "Passenger exist! Please update with different value", data: {} })
      // }

      return Model.update(objData, {where: params} )
      .then(async () => { 
          return { success: true, message: "Passenger success changed", data: objData } })
      .catch((err) => { return { success: false, message: "Passenger failed change", data: err } });
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
            return { success: true, message: "This Passenger not find", data: [] }
          } else {
            return { success: true, message: "This Passenger success delete", data: [] }
          }
        })
        .catch((err) => {
          console.log(err);
          return { success: false, message: "Passenger failed to remove", data: err }
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
        { success: true, message: "Passenger success find", data: resp } : 
        { success: false, message: "Passenger not find!", data: {} }
      });
    } catch (error) {
      console.log(error);
      throw error
    }
  },

}