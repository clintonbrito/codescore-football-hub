import * as Joi from 'joi';

const REQUIRED_FIELDS_MESSAGE = 'All fields must be filled';
const INVALID_EMAIL_OR_PASSWORD_MESSAGE = 'Invalid email or password';

const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': INVALID_EMAIL_OR_PASSWORD_MESSAGE,
      'any.required': REQUIRED_FIELDS_MESSAGE,
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': INVALID_EMAIL_OR_PASSWORD_MESSAGE,
      'any.required': REQUIRED_FIELDS_MESSAGE,
    }),
});

export default loginSchema;
