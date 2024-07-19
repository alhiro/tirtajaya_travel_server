var express = require("express");
var router = express.Router();
var headerAuth  =  require('../authMiddleware')
var validator = require("../validator/auth");
var controller = require("../controllers/go_send");
const ENV = process.env;
const now = Date.now();
const {check, validationResult} = require('express-validator');

 /**
  * @swagger
  * tags:
  *   name: Go send
  *   description: The Go send managing API
  */

/**
 * @swagger
 * /go-send/get?go_send_id={go_send_id}:
 *   get:
 *     summary: Returns the single person the Go send
 *     tags: [Go send]
 *     parameters:
 *       - in: query
 *         name: go_send_id
 *         required: false
 *         schema:
 *           type: integer
 *           format: int32
 *         description: Get an user from Go send
 *     responses:
 *       200:
 *         description: The single person of the Go send
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
    employee_id: req.body.employee_id,
    package_id: req.body.package_id,
    car_id: req.body.car_id,
    city_id: req.body.city_id,
    send_time: req.body.send_time,
    send_date: req.body.send_date,
    sp_number: req.body.sp_number,
    sp_package: req.body.sp_package,
    sp_passenger: req.body.sp_passenger,
    bsd: req.body.bsd,
    bsd_passenger: req.body.bsd_passenger,
    box: req.body.box,
    box_bsd: req.body.box_bsd,
    description: req.body.description,
    status: req.body.status,
    created_by: username
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
    go_send_id: req.body.go_send_id,
    employee_id: req.body.employee_id,
    package_id: req.body.package_id,
    car_id: req.body.car_id,
    city_id: req.body.city_id,
    send_time: req.body.send_time,
    send_date: req.body.send_date,
    sp_number: req.body.sp_number,
    sp_package: req.body.sp_package,
    sp_passenger: req.body.sp_passenger,
    bsd: req.body.bsd,
    bsd_passenger: req.body.bsd_passenger,
    box: req.body.box,
    box_bsd: req.body.box_bsd,
    description: req.body.description,
    status: req.body.status,
    updated_by: username
  }

  controller.update(data, res);
});

router.delete("/delete", headerAuth.isAdminAuthenticated, (req, res, next) => {
  const data = { 
    go_send_id: req.body.go_send_id
  };
  console.log('delete user ')
  console.log(data)
  controller.delete(data, res);
});

router.post("/search", (req, res, next) => {
  controller.search(req, res);
});

module.exports = router;
