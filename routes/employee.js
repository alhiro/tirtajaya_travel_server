var express = require("express");
var router = express.Router();
var headerAuth  =  require('../authMiddleware')
var validator = require("../validator/auth");
var controller = require("../controllers/employee");
const passportConf = require("../lib/passport");
const jwt = require("../lib/jwt");
const path = require('path');
const bcrypt = require("bcrypt-nodejs");
const multer = require('multer');
// upload file path
const FILE_PATH = 'images';
const ENV = process.env;
const now = Date.now();
const {check, validationResult} = require('express-validator');
// configure multer

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/employee' + FILE_PATH)
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

//will be using this for uplading
const upload = multer({
  storage: storage, 
  limits: {
    fileSize: 1024 * 2048, // 2 MB (max file size) & allow only 1 file per request
    files: 1,
  },
  fileFilter: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    console.log('ext file ' + ext);

    if (ext !== '.pdf' && ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
      req.fileValidationError = "Forbidden extension";
      return cb(null, false, req.fileValidationError);
    }
    cb(null, true);
  }
});

 /**
  * @swagger
  * tags:
  *   name: Employee
  *   description: The employee managing API
  */

/**
 * @swagger
 * /employee/get?employee_id={employee_id}:
 *   get:
 *     summary: Returns the single person the employee
 *     tags: [Employee]
 *     parameters:
 *       - in: query
 *         name: employee_id
 *         required: false
 *         schema:
 *           type: integer
 *           format: int32
 *         description: Get an user from employee
 *     responses:
 *       200:
 *         description: The single person of the employee
 */

router.get("/get", headerAuth.isUserAuthenticated,(req, res, next) => {
  controller.get(req, res);
});

router.get("/driver", headerAuth.isUserAuthenticated,(req, res, next) => {
  controller.driver(req, res);
});

router.get("/list", headerAuth.isUserAuthenticated,(req, res, next) => {
  controller.list(req, res);
});

router.post("/create", headerAuth.isUserAuthenticated, upload.fields('photo'), (req, res, next) => {
  const username = res.locals.auth.username;
  console.log("username");
  console.log(username);
  console.log(req.body);

  const imagefile = req.file;

  const data = {
    car_id: req.body.car_id,
    city_id: req.body.city_id,
    level_id: req.body.level_id,
    nik: req.body.nik,
    name: req.body.name,
    telp: req.body.telp,
    active: req.body.active,
    log: req.body.log,
  };

  if (imagefile) {
    data.photo = ENV.API_URL + '/ftp/' + FILE_PATH + '/' + imagefile.filename;
  } 

  controller.create(data, res);
});

router.put("/update", headerAuth.isUserAuthenticated, upload.fields('photo'), (req, res, next) => {
  const username = res.locals.auth.username;
  console.log("username");
  console.log(username);
  console.log(req.body);

  const imagefile = req.file;

  const data = {
    employee_id: req.body.employee_id,
    car_id: req.body.car_id,
    city_id: req.body.city_id,
    level_id: req.body.level_id,
    nik: req.body.nik,
    name: req.body.name,
    telp: req.body.telp,
    active: req.body.active,
    log: req.body.log,
  };

  if (imagefile) {
    data.photo = ENV.API_URL + '/ftp/' + FILE_PATH + '/' + imagefile.filename;
  } 

  controller.update(data, res);
});

router.delete("/delete", headerAuth.isAdminAuthenticated, (req, res, next) => {
  const data = { 
    employee_id: req.body.employee_id
  };
  console.log('delete user ')
  console.log(data)
  controller.delete(data, res);
});

router.post("/search", (req, res, next) => {
  controller.search(req, res);
});

module.exports = router;
