var express = require("express");
var router = express.Router();
var headerAuth  =  require('../authMiddleware')
var validator = require("../validator/auth");
var controller = require("../controllers/category_sub");
const ENV = process.env;
const now = Date.now();
const {check, validationResult} = require('express-validator');

 /**
  * @swagger
  * tags:
  *   name: Category sub
  *   description: The Category sub managing API
  */

/**
 * @swagger
 * /delivery-package/get?category_sub_id={category_sub_id}:
 *   get:
 *     summary: Returns the single person the Category sub
 *     tags: [Category sub]
 *     parameters:
 *       - in: query
 *         name: category_sub_id
 *         required: false
 *         schema:
 *           type: integer
 *           format: int32
 *         description: Get an user from Category sub
 *     responses:
 *       200:
 *         description: The single person of the Category sub
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
    category_id: req.body.category_id,
    name: req.body.name,
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
    category_sub_id: req.body.category_sub_id,
    category_id: req.body.category_id,
    name: req.body.name
  }

  controller.update(data, res);
});

router.delete("/delete", headerAuth.isAdminAuthenticated, (req, res, next) => {
  const data = { 
    category_sub_id: req.body.category_sub_id
  };
  console.log('delete user ')
  console.log(data)
  controller.delete(data, res);
});

router.post("/search", (req, res, next) => {
  controller.search(req, res);
});

module.exports = router;
