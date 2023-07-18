import Joi from 'joi';

const contactsAddSchema = Joi.object({
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

export default { contactsAddSchema };
