var express = require("express");
var router = express.Router();
var headerAuth  =  require('../authMiddleware')
var validator = require("../validator/auth");
var controller = require("../controllers/courier");
const ENV = process.env;
const now = Date.now();
const {check, validationResult} = require('express-validator');
const { update } = require("lodash");

 /**
  * @swagger
  * tags:
  *   name: Courier
  *   description: The Courier managing API
  */

/**
 * @swagger
 * /delivery-package/get?courier_id={courier_id}:
 *   get:
 *     summary: Returns the single person the Courier
 *     tags: [Courier]
 *     parameters:
 *       - in: query
 *         name: courier_id
 *         required: false
 *         schema:
 *           type: integer
 *           format: int32
 *         description: Get an user from Courier
 *     responses:
 *       200:
 *         description: The single person of the Courier
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
    package_id: req.body.package_id,
    taking_time: req.body.taking_time,
    taking_by: req.body.taking_by,
    taking_status: req.body.taking_status,
    office: req.body.office
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
    courier_id: req.body.courier_id,
    customer_id: req.body.customer_id,
    package_id: req.body.package_id,
    taking_time: req.body.taking_time,
    taking_by: req.body.taking_by,
    taking_status: req.body.taking_status,
    office: req.body.office,
    updated_by: username
  }

  controller.update(data, res);
});

router.delete("/delete", headerAuth.isAdminAuthenticated, (req, res, next) => {
  const data = { 
    courier_id: req.body.courier_id
  };
  console.log('delete user ')
  console.log(data)
  controller.delete(data, res);
});

router.post("/search", (req, res, next) => {
  controller.search(req, res);
});

module.exports = router;
