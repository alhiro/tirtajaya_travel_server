var express = require("express");
var router = express.Router();
var headerAuth  =  require('../authMiddleware')
var validator = require("../validator/auth");
var controller = require("../controllers/passenger");
const passportConf = require("../lib/passport");
const jwt = require("../lib/jwt");
const path = require('path');
const bcrypt = require("bcrypt-nodejs");
const ENV = process.env;
const now = Date.now();
const {check, validationResult} = require('express-validator');

 /**
  * @swagger
  * tags:
  *   name: Employee
  *   description: The passenger managing API
  */

/**
 * @swagger
 * /passenger/get?passenger_id={passenger_id}:
 *   get:
 *     summary: Returns the single person the passenger
 *     tags: [Employee]
 *     parameters:
 *       - in: query
 *         name: passenger_id
 *         required: false
 *         schema:
 *           type: integer
 *           format: int32
 *         description: Get an user from passenger
 *     responses:
 *       200:
 *         description: The single person of the passenger
 */

router.get("/get", headerAuth.isUserAuthenticated,(req, res, next) => {
  controller.get(req, res);
});

router.get("/list", headerAuth.isUserAuthenticated,(req, res, next) => {
  controller.list(req, res);
});

router.post("/create", headerAuth.isUserAuthenticated, (req, res, next) => {
  const username = res.locals.auth.username;
  console.log("username");
  console.log(username);

  const data = {
    waybill_id: req.body.waybill_id,
    destination_id: req.body.destination_id,
    employee_id: req.body.employee_id,
    go_send_id: req.body.go_send_id,
    tariff: req.body.tariff,
    discount: req.body.discount,
    agent_commission: req.body.agent_commission,
    other_fee: req.body.other_fee,
    total_passenger: req.body.total_passenger,
    payment: req.body.payment,
    status: req.body.status,
    note: req.body.note,
    description: req.body.description,
    resi_number: req.body.resi_number,
    cancel: req.body.cancel,
    move: req.body.move,
    position: req.body.position,
    charter: req.body.charter,
    check_payment: req.body.check_payment,
    created_by: username,
    created_at: now
  };
  console.log(data);

  controller.create(data, res);
});

router.put("/update", headerAuth.isUserAuthenticated, (req, res, next) => {
  const username = res.locals.auth.username;
  console.log("username");
  console.log(username);
  console.log(req.body);

  const data = {
    passenger_id: req.body.passenger_id,
    waybill_id: req.body.waybill_id,
    destination_id: req.body.destination_id,
    employee_id: req.body.employee_id,
    go_send_id: req.body.go_send_id,
    tariff: req.body.tariff,
    discount: req.body.discount,
    agent_commission: req.body.agent_commission,
    other_fee: req.body.other_fee,
    total_passenger: req.body.total_passenger,
    payment: req.body.payment,
    status: req.body.status,
    note: req.body.note,
    description: req.body.description,
    resi_number: req.body.resi_number,
    cancel: req.body.cancel,
    move: req.body.move,
    position: req.body.position,
    charter: req.body.charter,
    check_payment: req.body.check_payment,
    updated_by: username,
    updated_at: now
  };

  controller.update(data, res);
});

router.delete("/delete", headerAuth.isAdminAuthenticated, (req, res, next) => {
  const data = { 
    passenger_id: req.body.passenger_id
  };
  console.log('delete user ')
  console.log(data)
  controller.delete(data, res);
});

router.post("/search", (req, res, next) => {
  controller.search(req, res);
});

module.exports = router;
