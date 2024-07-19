const service = require("../services/recipient");
const sequelizeTransaction = require('../config/sequelizeTransaction')

exports.get = async (req, res, next) => {
  const id = req.query.recipient_id;
  try {
        var find = await service.get(id);
        return res.status(200).json(
          { 
            status: find.status, 
            data: find.data, 
            message: find.message 
          });
  } catch (err) {
    return res
      .status(500)
      .send({ code: 500, success: false, message: err.message, data: { err } });
  }
};

exports.list = async (req, res, next) => {
  try {
        var all = await service.list();
        return res.status(200).json(
          { 
            status: all.status, 
            data: all.data, 
            message: all.message 
          });
  } catch (err) {
    return res
      .status(500)
      .send({ code: 500, success: false, message: err.message, data: { err } });
  }
};

exports.create = async (req, res, next) => {
  try {
    let insert = await service.findOrCreate(req);
    return res.status(200).json(
      { 
        status: insert.status, 
        data: insert.data, 
        message: insert.message 
      });
  } catch (err) {
    return res
      .status(500)
      .send({ code: 500, success: false, message: err.message, data: { err } });
  }
};

exports.update = async function(req, res, next) {
  console.log("req :", req)
  const id = req.recipient_id;

  try {
    const find = await service.get(id);
    console.log("find.success :", find.success)
    console.log("find :", find.data.dataValues)
    if (find.success === true) {
      let update = await service.update(req);
      return res.status(200).json(
        { 
          status: update.status, 
          data: update.data, 
          message: update.message 
        });
    } else
    return res.status(400).json(
      { 
        status: find.status, 
        data: find.data, 
        message: find.message 
      });
    
  } catch (err) {
    return res
      .status(500)
      .send({ code: 500, success: false, message: err.message, data: { err } });
  }
};

exports.delete = async (req, res, next) => {
  try {
    var remove = await service.delete(req);
    return res.status(200).json(
      { 
        status: remove.status, 
        data: remove.data, 
        message: remove.message 
      });
  } catch (err) {
    return res
      .status(500)
      .send({ code: 500, success: false, message: err.message, data: { err } });
  }
};

exports.search = async function (req, res, next) {
  try {
        var search = await service.search(req.query);
        console.log('search');
        console.log(search);
        return res.status(200).json(
          { 
            status: search.status, 
            data: search.data, 
            message: search.message 
          });
  } catch (err) {
    return res
      .status(500)
      .send({ code: 500, success: false, message: err.message, data: { err } });
  }
};

exports.searchByFilter = async function (req, res, next) {
  const { body } = req;
  try {
        var partners = await service.searchByFilter(body);
        console.log("controller search");
        return res.status(200).json({ status: 200, data: partners, message: "Search recipient success" });
  } catch (err) {
    return res
      .status(500)
      .send({ code: 500, success: false, message: err.message, data: { err } });
  }
};
