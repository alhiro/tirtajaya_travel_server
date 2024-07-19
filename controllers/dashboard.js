const dashboard = require("../services/dashboard");
const sequelizeTransaction = require('../config/sequelizeTransaction')

exports.getNewCustomer = async function (req, res, next) {
  try {
        var portfolios = await dashboard.getNewCustomer();
        return res.status(200).json({ status: 200, data: portfolios, message: "New custimer find" });
  } catch (err) {
    return res
      .status(500)
      .send({ code: 500, success: false, message: err.message, data: { err } });
  }
};

exports.getHotCustomer = async function (req, res, next) {
  try {
        var result = await dashboard.getHotCustomer();
        return res.status(200).json({ status: 200, data: result, message: "Hot customer find" });
  } catch (err) {
    return res
      .status(500)
      .send({ code: 500, success: false, message: err.message, data: { err } });
  }
};

exports.getEmployeeOrderSummary = async function (req, res, next) {
  try {
    const { userId } = req;

    let data = await resv.findCustomerSummary(userId);
    data.code = data.success ? 200 : 500;
    return res.status(200).send(data);

  } catch (err) {
    console.log(err);
    return res.status(500).send({ data: err });
  }  
};