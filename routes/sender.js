var express = require("express");
var router = express.Router();
var headerAuth  =  require('../authMiddleware')
var validator = require("../validator/auth");
var controller = require("../controllers/sender");
const path = require('path');
const multer = require('multer');
const ENV = process.env;
const now = Date.now();
const {check, validationResult} = require('express-validator');

 /**
  * @swagger
  * tags:
  *   name: Sender
  *   description: The sender managing API
  */

/**
 * @swagger
 * /sender/get?sender_id={sender_id}:
 *   get:
 *     summary: Returns the single person the sender
 *     tags: [Sender]
 *     parameters:
 *       - in: query
 *         name: sender_id
 *         required: false
 *         schema:
 *           type: integer
 *           format: int32
 *         description: Get an user from sender
 *     responses:
 *       200:
 *         description: The single person of the sender
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
    // name: req.body.name,
    // address: req.body.address,
    // telp: req.body.telp,
    // longitude: req.body.longitude,
    // latitude: req.body.latitude,
    // zoom: req.body.zoom,
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
    sender_id: req.body.sender_id,
    customer_id: req.body.customer_id,
    package_id: req.body.package_id,
    // name: req.body.name,
    // address: req.body.address,
    // telp: req.body.telp,
    // longitude: req.body.longitude,
    // latitude: req.body.latitude,
    // zoom: req.body.zoom,
    date: req.body.date,
    time: req.body.time,
    updated_by: username
  }

  controller.update(data, res);
});

router.delete("/delete", headerAuth.isAdminAuthenticated, (req, res, next) => {
  const data = { 
    sender_id: req.body.sender_id
  };
  console.log('delete user ')
  console.log(data)
  controller.delete(data, res);
});

router.post("/search", (req, res, next) => {
  controller.search(req, res);
});

module.exports = router;
