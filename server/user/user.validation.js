const Joi = require('joi');

module.exports = {
    // POST /api/users
    createUser: {
        body: {
            username: Joi.string().required(),
            password: Joi.string().required(),
            email: Joi.string().regex(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/).required(),
            // firstName: Joi.string().required(),
            // lastName: Joi.string().required(),
            // gender: Joi.string().required(),
            // phone: Joi.string().regex(/^[0][0-9]{9}$/).required(),
            // dateOfBirth: Joi.string().required()
        }
    },

    // UPDATE /api/users/:userId
    updateUser: {
        body: {
            username: Joi.string().required(),
            password: Joi.string().required(),
            email: Joi.string().regex(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/).required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            gender: Joi.string().required(),
            phone: Joi.string().regex(/^[0][0-9]{9}$/).required(),
            dateOfBirth: Joi.string().required()
        },
        params: {
            userId: Joi.string().hex().required()
        }
    },

    // POST /api/auth/login
    login: {
        body: {
            username: Joi.string().required(),
            password: Joi.string().required()
        }
    }
};
