var express = require("express");
var router = express.Router();
var headerAuth  =  require('../authMiddleware')
var validator = require("../validator/auth");
var controller = require("../controllers/delivery_package");
const ENV = process.env;
const now = Date.now();
const {check, validationResult} = require('express-validator');

 /**
  * @swagger
  * tags:
  *   name: Delivery Package
  *   description: The Delivery Package managing API
  */

/**
 * @swagger
 * /delivery-package/get?delivery_package_id={delivery_package_id}:
 *   get:
 *     summary: Returns the single person the delivery package
 *     tags: [Delivery Package]
 *     parameters:
 *       - in: query
 *         name: delivery_package_id
 *         required: false
 *         schema:
 *           type: integer
 *           format: int32
 *         description: Get an user from delivery package
 *     responses:
 *       200:
 *         description: The single person of the delivery package
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
    admin: req.body.admin,
    description: req.body.description,
    used: req.body.used,
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
    delivery_package_id: req.body.delivery_package_id,
    customer_id: req.body.customer_id,
    package_id: req.body.package_id,
    customer_id: req.body.customer_id,
    package_id: req.body.package_id,
    admin: req.body.admin,
    description: req.body.description,
    used: req.body.used,
    time: req.body.time,
    updated_by: username
  }

  controller.update(data, res);
});

router.delete("/delete", headerAuth.isAdminAuthenticated, (req, res, next) => {
  const data = { 
    delivery_package_id: req.body.delivery_package_id
  };
  console.log('delete user ')
  console.log(data)
  controller.delete(data, res);
});

router.post("/search", (req, res, next) => {
  controller.search(req, res);
});

module.exports = router;
