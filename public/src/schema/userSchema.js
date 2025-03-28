const Joi = require('joi');

// Define the schema for creating a User
const CreateUserSchema = Joi.object({
  username: Joi.string()
    .max(50)
    .required()
    .label('Username'),

  password: Joi.string()
    .required()
    .label('Password'),

  email: Joi.string()
    .email()
    .max(100)
    .required()
    .label('Email Address'),

  phone: Joi.string()
    .max(15)
    .required()
    .label('Phone Number'),

  phone_code: Joi.string()
    .max(10)
    .optional()
    .label('Phone Code'),

  user_type: Joi.string()
    .max(20)
    .optional()
    .label('User Type'),
});

module.exports = { CreateUserSchema, UserSchema };