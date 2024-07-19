var express = require("express");
var router = express.Router();
var headerAuth  =  require('../authMiddleware')
var validator = require("../validator/auth");
var controller = require("../controllers/package");
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
    cb(null, './public/package' + FILE_PATH)
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
  *   description: The package managing API
  */

/**
 * @swagger
 * /package/get?package_id={package_id}:
 *   get:
 *     summary: Returns the single person the package
 *     tags: [Employee]
 *     parameters:
 *       - in: query
 *         name: package_id
 *         required: false
 *         schema:
 *           type: integer
 *           format: int32
 *         description: Get an user from package
 *     responses:
 *       200:
 *         description: The single person of the package
 */

router.get("/get", headerAuth.isUserAuthenticated,(req, res, next) => {
  controller.get(req, res);
});

router.get("/list", headerAuth.isUserAuthenticated,(req, res, next) => {
  controller.list(req, res);
});

router.post("/create", headerAuth.isUserAuthenticated, upload.fields('photo'), (req, res, next) => {
  const username = res.locals.auth.username;
  console.log("username");
  console.log(username);

  const imagefile = req.file;

  const data = {
    sender_id: req.body.sender_id,
    recipient_id: req.body.recipient_id,
    city_id: req.body.city_id,
    employee_id: req.body.employee_id,
    category_id: req.body.category_id,
    courier_id: req.body.courier_id,
    go_send_id: req.body.go_send_id,
    description: req.body.description,
    cost: req.body.cost,
    koli: req.body.koli,
    discount: req.body.discount,
    payment: req.body.payment,
    origin_from: req.body.origin_from,
    level: req.body.level,
    request: req.body.request,
    request_description: req.body.request_description,
    note: req.body.note,
    status: req.body.status,
    status_package: "Progress",
    resi_number: req.body.resi_number,
    photo: req.body.photo,
    print: req.body.print,
    move_time: req.body.move_time,
    book_date: req.body.book_date,
    send_date: req.body.send_date,
    check_payment: req.body.check_payment,
    check_sp: req.body.check_sp,
    check_date_sp: req.body.check_date_sp,
    taking_time: req.body.taking_time,
    taking_by: req.body.taking_by,
    taking_status: req.body.taking_status,
    office: req.body.office,
    created_by: username
  };

  if (imagefile) {
    data.photo = ENV.API_URL + '/ftp/' + FILE_PATH + '/' + imagefile.filename;
  } 

  console.log(data);

  controller.create(data, res);
});

router.put("/update", headerAuth.isUserAuthenticated, upload.fields('photo'), (req, res, next) => {
  const username = res.locals.auth.username;
  console.log("username");
  console.log(username);
  console.log(req.body);

  const imagefile = req.file;

  const data = {
    package_id: req.body.package_id,
    sender_id: req.body.sender_id,
    recipient_id: req.body.recipient_id,
    city_id: req.body.city_id,
    employee_id: req.body.employee_id,
    category_id: req.body.category_id,
    courier_id: req.body.courier_id,
    go_send_id: req.body.go_send_id,
    description: req.body.description,
    cost: req.body.cost,
    koli: req.body.koli,
    discount: req.body.discount,
    payment: req.body.payment,
    origin_from: req.body.origin_from,
    level: req.body.level,
    request: req.body.request,
    request_description: req.body.request_description,
    note: req.body.note,
    status: req.body.status,
    status_package: req.body.status_package,
    resi_number: req.body.resi_number,
    photo: req.body.photo,
    print: req.body.print,
    move_time: req.body.move_time,
    book_date: req.body.book_date,
    send_date: req.body.send_date,
    check_payment: req.body.check_payment,
    check_sp: req.body.check_sp,
    check_date_sp: req.body.check_date_sp,
    taking_time: req.body.taking_time,
    taking_by: req.body.taking_by,
    taking_status: req.body.taking_status,
    office: req.body.office,
    updated_by: username
  };

  if (imagefile) {
    data.photo = ENV.API_URL + '/ftp/' + FILE_PATH + '/' + imagefile.filename;
  } 

  controller.update(data, res);
});

router.patch("/update", headerAuth.isUserAuthenticated, upload.fields('photo'), (req, res, next) => {
  const username = res.locals.auth.username;
  console.log("username");
  console.log(username);
  console.log(req.body);

  const imagefile = req.file;

  const data = {
    package_id: req.body.package_id,
    sender_id: req.body.sender_id,
    recipient_id: req.body.recipient_id,
    city_id: req.body.city_id,
    employee_id: req.body.employee_id,
    category_id: req.body.category_id,
    courier_id: req.body.courier_id,
    go_send_id: req.body.go_send_id,
    description: req.body.description,
    cost: req.body.cost,
    koli: req.body.koli,
    discount: req.body.discount,
    payment: req.body.payment,
    origin_from: req.body.origin_from,
    level: req.body.level,
    request: req.body.request,
    request_description: req.body.request_description,
    note: req.body.note,
    status: req.body.status,
    status_package: req.body.status_package,
    resi_number: req.body.resi_number,
    photo: req.body.photo,
    print: req.body.print,
    move_time: req.body.move_time,
    book_date: req.body.book_date,
    send_date: req.body.send_date,
    check_payment: req.body.check_payment,
    check_sp: req.body.check_sp,
    check_date_sp: req.body.check_date_sp,
    taking_time: req.body.taking_time,
    taking_by: req.body.taking_by,
    taking_status: req.body.taking_status,
    office: req.body.office,
    updated_by: username
  };

  if (imagefile) {
    data.photo = ENV.API_URL + '/ftp/' + FILE_PATH + '/' + imagefile.filename;
  } 

  controller.update(data, res);
});

router.delete("/delete", headerAuth.isAdminAuthenticated, (req, res, next) => {
  const data = { 
    package_id: req.body.package_id
  };
  console.log('delete user ')
  console.log(data)
  controller.delete(data, res);
});

router.post("/search", (req, res, next) => {
  controller.search(req, res);
});

module.exports = router;
