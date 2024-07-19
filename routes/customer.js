var express = require("express");
var router = express.Router();
var headerAuth  =  require('../authMiddleware')
var validator = require("../validator/auth");
var controller = require("../controllers/customer");

 /**
  * @swagger
  * tags:
  *   name: Customer
  *   description: The Customer managing API
  */

/**
 * @swagger
 * /customer/get?customer_id={customer_id}:
 *   get:
 *     summary: Returns the single person the customer
 *     tags: [Customer]
 *     parameters:
 *       - in: query
 *         name: customer_id
 *         required: false
 *         schema:
 *           type: integer
 *           format: int32
 *         description: Get an user from customer
 *     responses:
 *       200:
 *         description: The single person of the customer
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
  console.log(req.body);

  const data = {
    business_id: req.body.business_id,
    company_id: req.body.company_id,
    name: req.body.name,
    telp: req.body.telp,
    admin: req.body.admin,
    address: req.body.address,
    status: req.body.status,
    created_by: username
  };

  controller.create(data, res);
});

router.put("/update", headerAuth.isUserAuthenticated, (req, res, next) => {
  const username = res.locals.auth.username;
  console.log("username");
  console.log(username);
  console.log(req.body);

  const data = {
    customer_id: req.body.customer_id,
    business_id: req.body.business_id,
    company_id: req.body.company_id,
    name: req.body.name,
    telp: req.body.telp,
    admin: req.body.admin,
    address: req.body.address,
    status: req.body.status,
    updated_by: username
  };

  controller.update(data, res);
});

router.delete("/delete", headerAuth.isAdminAuthenticated, (req, res, next) => {
  const data = { 
    customer_id: req.body.customer_id
  };
  console.log('delete user ')
  console.log(data)
  controller.delete(data, res);
});

router.post("/search", (req, res, next) => {
  controller.search(req, res);
});

module.exports = router;
