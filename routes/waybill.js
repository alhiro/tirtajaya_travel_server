var express = require("express");
var router = express.Router();
var headerAuth  =  require('../authMiddleware')
var validator = require("../validator/auth");
var controller = require("../controllers/waybill");
const path = require('path');
const multer = require('multer');
const ENV = process.env;
const now = Date.now();
const {check, validationResult} = require('express-validator');

 /**
  * @swagger
  * tags:
  *   name: Waybill
  *   description: The Waybill managing API
  */

/**
 * @swagger
 * /waybill/get?waybill_id={waybill_id}:
 *   get:
 *     summary: Returns the single person the waybill
 *     tags: [Waybill]
 *     parameters:
 *       - in: query
 *         name: waybill_id
 *         required: false
 *         schema:
 *           type: integer
 *           format: int32
 *         description: Get an user from waybill
 *     responses:
 *       200:
 *         description: The single person of the waybill
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
    customer_id: req.body.customer_id,
    address_id: req.body.address_id,
    passenger_id: req.body.passenger_id,
    date: req.body.date,
    time: req.body.time,
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
    waybill_id: req.body.waybill_id,
    customer_id: req.body.customer_id,
    address_id: req.body.address_id,
    passenger_id: req.body.passenger_id,
    date: req.body.date,
    time: req.body.time,
    updated_by: username
  }

  controller.update(data, res);
});

router.delete("/delete", headerAuth.isAdminAuthenticated, (req, res, next) => {
  const data = { 
    waybill_id: req.body.waybill_id
  };
  console.log('delete user ')
  console.log(data)
  controller.delete(data, res);
});

router.post("/search", (req, res, next) => {
  controller.search(req, res);
});

module.exports = router;
