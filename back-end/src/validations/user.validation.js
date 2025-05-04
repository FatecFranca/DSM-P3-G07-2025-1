import Joi from 'joi'

export const createUserSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'O nome é obrigatório',
    'any.required': 'O nome é obrigatório'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email inválido',
    'string.empty': 'O email é obrigatório',
    'any.required': 'O email é obrigatório'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'A senha deve ter no mínimo 6 caracteres',
    'string.empty': 'A senha é obrigatória',
    'any.required': 'A senha é obrigatória'
  }),
})

export const updateUserSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
})

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Email inválido',
    'string.empty': 'O email é obrigatório',
    'any.required': 'O email é obrigatório'
  }),
  password: Joi.string().required().messages({
    'string.empty': 'A senha é obrigatória',
    'any.required': 'A senha é obrigatória'
  })
}) 