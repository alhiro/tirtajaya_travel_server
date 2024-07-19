var express = require("express");
var router = express.Router();
var headerAuth  =  require('../authMiddleware')
var validator = require("../validator/auth");
var controller = require("../controllers/recipient");
const ENV = process.env;
const now = Date.now();
const {check, validationResult} = require('express-validator');

 /**
  * @swagger
  * tags:
  *   name: Recipient
  *   description: The Recipient managing API
  */

/**
 * @swagger
 * /delivery-package/get?recipient_id={recipient_id}:
 *   get:
 *     summary: Returns the single person the Recipient
 *     tags: [Recipient]
 *     parameters:
 *       - in: query
 *         name: recipient_id
 *         required: false
 *         schema:
 *           type: integer
 *           format: int32
 *         description: Get an user from Recipient
 *     responses:
 *       200:
 *         description: The single person of the Recipient
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
    date: req.body.date,
    time: req.body.time,
    user_payment: req.body.user_payment,
    date_payment: req.body.date_payment,
    received_by: req.body.received_by,
    sign: req.body.sign,
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
    recipient_id: req.body.recipient_id,
    customer_id: req.body.customer_id,
    package_id: req.body.package_id,
    date: req.body.date,
    time: req.body.time,
    user_payment: req.body.user_payment,
    date_payment: req.body.date_payment,
    received_by: req.body.received_by,
    sign: req.body.sign,
    updated_by: username
  }

  controller.update(data, res);
});

router.delete("/delete", headerAuth.isAdminAuthenticated, (req, res, next) => {
  const data = { 
    recipient_id: req.body.recipient_id
  };
  console.log('delete user ')
  console.log(data)
  controller.delete(data, res);
});

router.post("/search", (req, res, next) => {
  controller.search(req, res);
});

module.exports = router;
