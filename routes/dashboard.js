var express = require("express");
var dashboardRouter = express.Router();
var dashboardController = require("../controllers/dashboard");
var headerAuth  =  require('../authMiddleware');

dashboardRouter.get("/get-new-customer", (req, res, next) => {
  dashboardController.getNewCustomer(req, res);
});

dashboardRouter.get("/get-hot-customer", (req, res, next) => {
  dashboardController.getHotCustomer(req, res);
});

dashboardRouter.get("/get-employee-order-summary", headerAuth.isAdminAuthenticated, (req, res, next) => {
  const id = res.locals.auth.id;
  const data = { 
    userId: id
  };
  dashboardController.getEmployeeOrderSummary(data, res);
});

module.exports = dashboardRouter;