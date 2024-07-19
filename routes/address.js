var express = require("express");
var router = express.Router();
var headerAuth  =  require('../authMiddleware')
var validator = require("../validator/auth");
var controller = require("../controllers/address");

 /**
  * @swagger
  * tags:
  *   name: Address
  *   description: The Address managing API
  */

/**
 * @swagger
 * /delivery-package/get?car={address_id}:
 *   get:
 *     summary: Returns the single person the Address
 *     tags: [Address]
 *     parameters:
 *       - in: query
 *         name: address_id
 *         required: false
 *         schema:
 *           type: integer
 *           format: int32
 *         description: Get an user from Address
 *     responses:
 *       200:
 *         description: The single person of the Address
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
    name: req.body.name,
    address: req.body.address,
    telp: req.body.telp,
    defaults: req.body.default,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    zoom: req.body.zoom,
    description: req.body.description,
    used: req.body.used,
    created_by: username
  };
  console.log(data);

  controller.create(data, res);
});

router.put("/update", headerAuth.isUserAuthenticated, (req, res, next) => {
  const username = res.locals.auth.username;
  console.log("username");
  console.log(username);

  const data = {
    address_id: req.body.address_id,
    customer_id: req.body.customer_id,
    name: req.body.name,
    address: req.body.address,
    telp: req.body.telp,
    defaults: req.body.default,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    zoom: req.body.zoom,
    description: req.body.description,
    used: req.body.used,
    updated_by: username
  }
  controller.update(data, res);
});

router.put('/update/all', (req, res) => {
  const data = req.body;
  console.log('Received data:', data);

  controller.updateObject(data, res);
});

router.delete("/delete", headerAuth.isAdminAuthenticated, (req, res, next) => {
  const data = { 
    address_id: req.body.address_id
  };
  console.log('delete user ')
  console.log(data)
  controller.delete(data, res);
});

router.post("/search", (req, res, next) => {
  controller.search(req, res);
});

module.exports = router;
