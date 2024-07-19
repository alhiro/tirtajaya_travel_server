const Model = require("../models/users");
const { VERIFY_URL, EMAIL_PASSWORD, EMAIL_USERNAME } = process.env;
const nodemailer = require("nodemailer");
//const Otp = require('../models/otp');
const transformers = require("../lib/transformers");
const jwt = require("../lib/jwt");
const utils = require("../lib/utils");
const dbSeq = require("../config/sequelize");
const moment = require("moment");
const path = require('path');
const {
  NODE_ENV,
  APP_ID,
  SMS_PROVIDER,
  SMS_SENDER_NUMBER,
  SMS_PRODUCER_NAME,
  EMAIL_PRODUCER_NAME,
  APP_LOCAL_DOMAIN
} = process.env;

const now = moment()
  .utcOffset(7)
  .format("YYYY-MM-DD HH:mm:ss");
const StoreHelper = require("../helpers/store");
const crypto = require("crypto-random-string");
var async = require('async');
var cryptos = require('crypto');
const resetSecret = process.env.TOKEN_JWT_SECRET;
const {check, validationResult} = require('express-validator');

const sequelize = require("../config/sequelize");

module.exports = {
  login: async (users, revoke) => {
    console.log("login service");
    let user = {};

    user = await transformers.user(users);

    console.log(user);
    const token = await jwt.sign(user);
    const decoded = await jwt.verify(token);
    const random = await utils.randomChar(8);
    console.log("token", token);
    console.log("decoded", decoded);
    //check if revoke refresh token is true. return null if true, or assign new refresh token if false
    const refresh_token = revoke ? null : await jwt.sign({ random });

    // const tokenCreate = crypto({ length: 16 });
    // console.log(tokenCreate)

    let data = {
      last_login: now,
      refresh_token: refresh_token,
      expired_reset_token: new Date(decoded.exp * 1000),
    };

    return Model.update(data, { where: { username: users.username }, 
      returning: true,
      plain: true })
      .then(updated => {
        console.log("updated : ", updated.length)
        console.log("updated : ", updated[1].dataValues)
        return {
          success: true,
          message: "Success Login",
          data: {
            token,
            expired_reset_token: new Date(decoded.exp * 1000),
            refresh_token
          }
        };
      })
      .catch(err => {
        return { success: false, message: "Failed Login", data: err };
      });
  },

  getAll: async () => {
    try {
      console.log("user get all");
      return await Model.findAll({
        include: [
          {
            model: PartnerCategory,
          }
        ]
      }).then(users => {
        //delete users.dataValues.password
        return !users
          ? { success: false, message: "User Belum Ada!", data: {} }
          : { success: true, message: "User Berhasil Ditemukan", data: users };
      })
      .catch(err => {
        return { success: false, message: "User Belum Ada, Ada Kesalahan Server!", data: err };
      });
      ;
    } catch (error) {
      throw error;
    }
  },

  findUser: async params => {
    console.log("servive findUser")
    console.log("params : "+ JSON.stringify(params))
    return await Model.findOne({ where: params })
      .then(users => {
        //delete users.dataValues.password
        return !users
          ? { success: false, message: "User not find", data: {} }
          : { success: true, message: "User find", data: users };
      })
      .catch(err => {
        return { success: false, message: "Error something. The server can not reach", data: err };
      });
  },

  findUserProfile: async (params, req) => {    
    try {
      console.log('req me' )
      console.log(req)

      var users = await Model.findOne({ 
        where: params,
        attributes: [
          "id", "email", "name", "picture", "given_name", "family_name", "phone_number", "active", "token", "address", "nation", "dob", "province", "city", "postalcode", "type", "title", "description", "longitude", "latitude", "whatsapp_number", "last_login", "refresh_token", "reset_token", "expired_reset_token", "verified_document", "is_verified", "process_verified", "created_at", "created_by", "updated_at", "updated_by", "createdAt", "updatedAt",
          [
            sequelize.literal(`(
            SELECT COUNT(reservation_no)
                FROM reservation rv
                WHERE rv.user_id = `+req.partner_id+`
                AND (rv.status_code = 'ORDER_NEW' OR rv.status_code = 'ORDER_PARTNER_CONFIRM')
                ORDER BY COUNT(reservation_no) DESC
            )`),
            'cart_length',
          ],
        ],
      });
        
      if(!users) {
        return { success: false, message: "User Tidak Ditemukan", data: {} }
      } 
      else {
        return { success: true, message: "User Ditemukan", data: users };   
      }
    } 
    catch (error) {
      console.log(error);
      throw error;
    }
  },

  findOrCreateUser: async (params, req) => {
    try {
      // 1. Insert new user
      var currentDate = moment()
        .utcOffset(7)
        .format("YYMMDD");

      const isExist = await Model.findOne({ where: params });
      console.log(currentDate);

      const nowStoreId = await Model.findOne({
        where: { storeid: { $like: `${currentDate}%` } },
        order: [["storeid", "DESC"]]
      });
      //const nowStoreId = await Model.findOne({ where: {storeid: {$like: `%190712001` }}, order: [['storeid', 'DESC']] })

      //create new storeid
      if (!nowStoreId) {
        newStoreId = currentDate + "001";
      } else {
        var strNewId =
          Number(nowStoreId.dataValues.storeid.substring(6, 9)) + 1;
        if (strNewId.toString().length < 3) {
          newStoreId =
            currentDate + "0".repeat(3 - strNewId.toString().length) + strNewId;
        } else {
          newStoreId = currentDate + strNewId;
        }
      }

      console.log("storeid : " + newStoreId);

      // check email / phone already registered or not
      if (!isExist) {
        const { body } = req;
        const storeHelper = new StoreHelper();
        const storeData = await storeHelper.generateUserData(body, newStoreId);
        console.log(storeData);
        const insertUser = await Model.findOrCreate({
          where: params,
          defaults: storeData
        });
        if (!insertUser[1]) {
          throw {
            success: false,
            message: "Nomor Handphone Sudah Ada!",
            data: {}
          };
        } else {
          delete insertUser[0].dataValues.password;
          return {
            success: true,
            message: "User Berhasil Dibuat",
            data: insertUser[0].dataValues
          };
        }
      } else {
        return {
          success: false,
          message: "Nomor Handphone Sudah Ada!",
          data: {}
        };
      }

      // all operation success
    } catch (error) {
      throw error;
    }
  },

  registerUser: async (params, transaction, res) => {
    try {
      console.log("service register user");

      const { username, password, level } = params;
      const generateHashPassword = await jwt.hash(password, 10);

      const token = crypto({ length: 16 });
      console.log("generateHashPassword: " + generateHashPassword);
      console.log("token: " + token);
      var objUser = {
        username: username,
        password: generateHashPassword,
        token: token,
        level: level
      };

      const insertUser = await Model.create(objUser, {
        transaction
      });
      console.log("returning : " + JSON.stringify(insertUser));
      if (!insertUser) {
        throw { success: false, message: "Failed register user!", data: {} };
      } else {
        transaction.commit();
        delete insertModel.dataValues.password;

        return {
          success: true,
          message: "User has success created. Please login",
          data: insertModel.dataValues
        };
      }
    } catch (error) {
      transaction.rollback();
      throw error;
    }
  },

  registerGoogleUser: async (params, transaction, res) => {
    try {
      console.log("service register google user");

      const { email, picture, name, userType } = params;
      const generateHashPassword = await jwt.hash("12345678", 10);

      const token = crypto({ length: 16 });
      console.log("generateHashPassword: " + generateHashPassword);
      console.log("token: " + token);
      var objUser = {
        email: email,
        name: name,
        token: token,
        password: generateHashPassword,
      };

      const insertUser = await Model.create(objUser, {
        transaction
      });

      console.log("returning : " + JSON.stringify(insertUser));
      if (!insertUser) {
        throw { success: false, message: "Gagal Daftar User", data: {} };
      } else {
        transaction.commit();
        delete insertModel.dataValues.password;

        return {
          success: true,
          message: "User Berhasil Dibuat",
          data: insertModel.dataValues
        };
      }
    } catch (error) {
      transaction.rollback();
      throw error;
    }
  },

  verifyUser: async (email, token, res) => {
    let objUser = {
      active: 1
    };
    console.log("email :" + email);
    console.log("token 2 :" + token.replace(/['"]+/g, ""));
    console.log("response :" + res);

    return await Model.update(objUser, {
      where: { token: token.replace(/['"]+/g, ""), email: email }
    })
      .then(updated => {
        console.log("updated : " + updated);
        if (updated > 0)
          return res.sendFile(path.join(__dirname, '../views', 'success_activation.html'));
        else
          return res.sendFile(path.join(__dirname, '../views', 'failed_activation.html'));
      })
      .catch(err => {
        return { success: false, message: err.message, data: err };
      });
  },

  // resetPassword: async (email, token, res) => {
  //   return await Model.findOne({ where: { email: email } })
  //     .then(users => {
  //       //delete users.dataValues.password

  //       if(!users) {
  //         console.log('user forget password tidak ada');
  //       }

  //       console.log('user forget password adaaaa');

  //       crypto.randomBytes(20, function (err, buf) {
  //         var token = buf.toString('hex');
  //         done(err, token);
  //       });

  //       user.token = token;
  //       // user.tokenExpires = Date.now() + 3600000; // 1 hour

  //       user.save(function (err) {
  //         done(err, token, user);
  //       });
  //     })
  //     .catch(err => {
  //       return { success: false, message: "User Tidak Ditemukan", data: err };
  //     });      
  // },


  resetPassword: async (users, req) => {
    console.log("req.query.email: " + req.query.email);

    try {     
      // generate new token expired
      const tokenX = cryptos.randomBytes(20).toString("hex");
      console.log("generateToken: " + tokenX);         
      
       // set response token expired
      user = await transformers.resetToken(users);
      const tokenExpired = await jwt.reset(user, resetSecret, { expiresIn: "1m" });
      const decoded = await jwt.verify(tokenExpired);
      console.log("token decoded ", decoded);
      console.log("token decoded expired : " + JSON.stringify(new Date(decoded.exp * 1000).toLocaleString()));

      var object = {
        reset_token: tokenX,
        expired_reset_token: new Date(decoded.exp * 1000)
      };
      const update = await Model.update(object, {
        where: { email: req.query.email }
      })      

      if (!update) {
        throw { success: false, message: "Gagal Update Token Reset Password User", data: {} };
      } else {
        return {
          success: true,
          message: "Token Reset Password User Berhasil Dibuat",
          data:  {
            email: req.query.email,
            reset_token: tokenX,
          }
        };
      }
    } catch (error) {
      throw error;
    }
  },

  updateNewPassword: async (req, res) => {
    console.log("Update reset new password service");    

    const { reset_token, password, validate } = req;
    console.log("req new reset :", req);

    //Check for errors
    var errors = validationResult(validate);
    console.log("validationResult new reset :", errors.errors);

    if (!errors.isEmpty()) {
      res.render(path.join(__dirname, '../views', 'reset.jade'), {
        errors: errors,
      });
    } else {
      console.log("gooooooooooooooo:");

      const generateHashPassword = await jwt.hash(password, 10);
      var data = {
        password: generateHashPassword
      };

      return Model.update(data, {
        where: { reset_token: reset_token },
        returning: true,
        plain: true
      })
        .then(async updated => {
          console.log(updated[1].dataValues);
          delete updated[1].dataValues.password;
          delete updated[1].dataValues.reset_token;
  
          // set value null token reset after change new password via reset
          var object = {
            reset_token: null,
          };
          await Model.update(object, {
            where: { email: updated[1].dataValues.email }
          })
  
          return {
            success: true,
            message: "Password Berhasil Diubah",
            data: updated[1]
          };
        })
        .catch(err => {
          return { success: false, message: "Password Gagal Diubah", data: err };
        });
    }
  },

  updateProfile: async params => {
    console.log("Update profile service");

    const {
      email,
      name,
      title,
      picture,
      description,
      address,
      phone,
      whatsapp_number,
      dob,
      nation,
      province,
      city,
      postalcode,
      verified_document,
      type 
    } = params;
    console.log("params :", params);
    let data = {
      name: name,
      title: title,
      picture: picture,
      description: description,
      address: address,
      phone_number: phone,
      whatsapp_number: whatsapp_number,
      dob: dob,
      nation: nation,
      province: province,
      city: city,
      postalcode: postalcode,
      verified_document: verified_document,
      type: type
    };

    return Model.update(data, {
      where: { email: email },
      returning: true,
      plain: true
    })
      .then(updated => {
        console.log(updated[1].dataValues);
        delete updated[1].dataValues.password;
        return {
          success: true,
          message: "Profil Berhasil Diubah",
          data: updated[1]
        };
      })
      .catch(err => {
        return { success: false, message: "Profil Gagal Diubah", data: err };
      });
  },

  updatePassword: async params => {
    console.log("Update profile password service");    

    const { username, password } = params;
    console.log("params :", params);

    const generateHashPassword = await jwt.hash(password, 10);
    let data = {
      username: username,
      password: generateHashPassword
    };

    return Model.update(data, {
      where: { username: username },
      returning: true,
      plain: true
    })
      .then(updated => {
        console.log(updated[1].dataValues);
        delete updated[1].dataValues.password;
        return {
          success: true,
          message: "Password success change",
          data: updated[1]
        };
      })
      .catch(err => {
        return { success: false, message: "Password failed to change", data: err };
      });
  },

  delete: async (data) => {
    try {
      const { partner_id, id } = data;

      return Model.destroy({
        where: {
          id: partner_id,
        },
      })
        .then(async (deleted) => {
          console.log('deleted')
          console.log(deleted)
          if (deleted == 0) {
            return { success: true, message: "Akun Ini Tidak Ditemukan", data: [] }
          } else {
            return { success: true, message: "Akun Berhasil Dihapus", data: [] }
          }
        })
        .catch((err) => {
          console.log(err);
          return { success: false, message: "Akun Gagal Dihapus", data: err }
        });
    } catch (error) {
      console.log(error);
      throw (error)
    }
  },
  /*

  insertProfile: async params => {
    try {
      console.log("insert profile service");

      const {
        email,
        name,
        address,
        phone,
        dob,
        nation,
        province,
        city,
        postalcode
      } = params;

      console.log(JSON.stringify(params));

      var objInvent = {
        name: name,
        address: address,
        phone: phone,
        dob: dob,
        nation: nation,
        province: province,
        city: city,
        postalcode: postalcode
      };

      const insertInvent = await Model.create(objInvent, {
        transaction
      });
      transaction.commit();
      console.log(insertInvent);
      if (!insertInvent) {
        return {
          success: false,
          message: "Insert User Profile Failed",
          data: insertInvent
        };
      } else {
        return {
          success: true,
          message: "Insert User Profile Successful",
          data: insertInvent
        };
      }
    } catch (error) {
      transaction.rollback();
      throw error;
    }
  },


    forgotPassword: async (users) => {
      const user = await transformers.user(users);
      const new_password = await utils.randomChar(8);
      let data = {};
      let mail = {
        app_id: "BizzyPOS",
        type: "forgot_password",
        to: user.company_email,
        from: "info@bizzypos.id",
        title: "Your Password Renewal Link",
        message: {
          Html: {
            Charset: "UTF-8",
            Data: `<h3>Your Password Renewal Link</h3>
                                              <br>
                                              <p>Dear Customer,<p>
                                              <br>
                                              <p>Our system have detected that you have requested a password renewal</p>
                                              <p>Below is your new generated password</p>
                                              <p><b>${new_password}</b></p>
                                              <p>Please do not reply to this email, whereas this is an auto generated email by system.</p>
                                              <br>
                                              Thank you`
          },
          Text: {
            Charset: "UTF-8",
            Data: `Your Password Renewal Link
  
                                              Dear Customer,
                                              Our system have detected that you have requested a password renewal
                                              Below is your new generated password
                                              ${new_password}
                                              Please do not reply to this email, whereas this is an auto generated email by system.
  
                                              Thank you`
          }
        }
      };
  
      //update forgot_password_code & forgot_password_time
      data.password = await jwt.hash(new_password, 10);
      data.forgotten_password_time = now;
  
      return dbSeq.transaction(function (t) {
        //insert valid forgot code
        return Model.update(data, { where: { company_email: user.company_email } }, { transaction: t })
          .then(async (updated) => {
            //send email
            AWS.config.update({
              region: AWS_REGION_NAME,
              accessKeyId: AWS_BUCKET_KEYID,
              secretAccessKey: AWS_BUCKET_ACCESS
            });
            var lambda = new AWS.Lambda();
  
            var params = {
              FunctionName: EMAIL_PRODUCER_NAME + ':' + NODE_ENV,
              InvocationType: 'RequestResponse',
              LogType: 'Tail',
              Payload: JSON.stringify({ mail: mail })
            };
  
            return new Promise((resolve, reject) => {
              return lambda.invoke(params, function (err, result) {
                if (err) reject({ success: false, message: "Mail Queue Not Sent", data: err });
                else resolve({ success: true, message: "Mail Queue Sent", data: { mail, result } });
              });
            });
          })
          .catch((err) => { return { success: false, message: "Request Failed", data: err } });
      })
    },
  
    sendOTP: async (users) => {
      const user = await transformers.user(users);
      let otp_code = await utils.randomNumber(4);
      var sms = {
        app_id: APP_ID,
        type: 'otp',
        message: `Your OTP code is ${otp_code}`,
        phone_no: user.phone,
        sender_id: SMS_SENDER_NUMBER,
        provider: SMS_PROVIDER
      }
      var data = {}
  
      data.otp_code = otp_code;
      data.owner_id = user.id;
      data.exp_time = moment().utcOffset(7).add(1, 'days').format("YYYY-MM-DD HH:mm:ss");
      data.created_at = now;
      data.type = "otp";
  
      return dbSeq.transaction(function (t) {
        //insert otp data
        return Otp.create(data, { transaction: t })
          .then((created) => {
            //send sms
            AWS.config.update({
              region: AWS_REGION_NAME,
              accessKeyId: AWS_BUCKET_KEYID,
              secretAccessKey: AWS_BUCKET_ACCESS
            });
            var lambda = new AWS.Lambda();
  
            var params = {
              FunctionName: SMS_PRODUCER_NAME + ':' + NODE_ENV,
              InvocationType: 'RequestResponse',
              LogType: 'Tail',
              Payload: JSON.stringify({ sms: sms })
            };
  
            return new Promise((resolve, reject) => {
              return lambda.invoke(params, function (err, result) {
                if (err) reject({ success: false, message: "OTP Queue Not Sent", data: err });
                else resolve({ success: true, message: "OTP Queue Sent", data: { created, sms, result } });
              });
            });
          })
          .catch((err) => { return { success: false, message: "OTP Not Sent", data: err } });
      })
    },
  
    verifyUser: async (users) => {
      const user = await transformers.user(users);
  
      let data = {
        is_verified: 1,
        verified_date: now
      };
  
      return await Model.update(data, { where: { id: user.id } })
        .then((updated) => { return { success: true, message: "Verify User Successful", data: {} } })
        .catch((err) => { return { success: false, message: "Verify User Failed", data: err } });
    },
  
    activateUser: async (users) => {
      const user = await transformers.user(users);
  
      let data = {
        active: 1,
        active_at: now
      };
  
      return await Model.update(data, { where: { id: user.id } })
        .then((updated) => { return { success: true, message: "Activate User Successful", data: {} } })
        .catch((err) => { return { success: false, message: "Activate User Failed", data: err } });
    },
  
    updateUser: async (id, userData) => {
      console.log('id',id.id)
      const { userInformation, userLegalImages } = userData
  
      delete userInformation.password
      return await Model.update(userInformation, { where:  id })
        .then(
          function (foundItem) {
            if (foundItem==0) {
              return { success: false, message: "User not Found", data: {} } 
          } else {
              // Found an item, update it
              const legalImagesWithId = userLegalImages.map(image => {
                image.user_id = id.id
                return image
              })
              DocumentStatus.destroy({ where: id })
              DocumentStatus.bulkCreate(legalImagesWithId)
              delete userInformation.password
              return { success: true, message: "Update User Data Successful", data: userInformation } 
          }
        })
        .catch((err) => { return { success: false, message: "Update User Data Failed", data: err } });
    },
  
    */
};
