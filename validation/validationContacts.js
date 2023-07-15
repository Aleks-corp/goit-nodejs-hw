import Joi from 'joi';
import ApiError from '../helpers/ApiError.js';

const contactsSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': `'name' should be a type of 'text'`,
    'string.empty': `'name' cannot be an empty field`,
    'any.required': `missing required 'name' field`,
  }),
  email: Joi.string().email().required().messages({
    'string.email': `'email' should be a type of 'email'`,
    'string.empty': `'email' cannot be an empty field`,
    'any.required': `missing required 'email' field`,
  }),
  phone: Joi.string().required().messages({
    'string.empty': `'phone' cannot be an empty field`,
    'any.required': `missing required 'phone' field`,
  }),
});

const ValidateData = (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    if (!name && !email && !phone) {
      throw ApiError(400, 'Missing fields');
    }
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw ApiError(400, error.message);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default ValidateData;
