const joi = require("joi");
//.extend(require('@hapi/joi-date'));
const patternDob = /^\d{4}-\d{2}-\d{2}$/;
const { validate } = require("../lib/validate");

module.exports = {
  login: () => {
    const schema = {
      body: joi.object().keys({
        username: joi
          .string()
          .required()
          .options({
            language: {
              string: { username: 'Username can not empty.' },
            },
          }),    
        password: joi
          .string()
          .required()
          .min(7)
          .options({
            language: {
              string: { min: 'Password minimal must be 7 characters' },
            },
          }),
      })
    };

    return validate(schema);
  },

  register: () => {
    const schema = {
      body: joi.object().keys({
        email: joi
          .string()
          .email({ minDomainAtoms: 2 })
          .required()
          .options({
            language: {
              string: { email: 'Format email salah.' },
              any: { empty: 'Email tidak boleh kosong.' },
            },
          }),        
        name: joi.string().required(),
        password: joi
          .string()
          .required()
          .min(7)
          .options({
            language: {
              string: { min: 'Kata sandi minimal harus 7 karakter' },
            },
          }),
        phone: joi
          .string(),
        whatsapp: joi
          .string()
          .allow(""),
        address: joi
          .string()
          .allow(""),   
        province: joi
          .string()
          .allow(""),
        city: joi
          .string()
          .allow(""),        
        // dob: joi.string().regex(patternDob),
        // nation: joi.string(),
      })
    };

    return validate(schema);
  }
};
