import Joi from 'joi'

export const createEndpointSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'O nome do endpoint é obrigatório',
    'any.required': 'O nome do endpoint é obrigatório'
  }),
  url: Joi.string().required().messages({
    'string.empty': 'A URL do endpoint é obrigatória',
    'any.required': 'A URL do endpoint é obrigatória'
  }),
  method: Joi.string().required().messages({
    'string.empty': 'O método do endpoint é obrigatório',
    'any.required': 'O método do endpoint é obrigatório'
  }),
  headers: Joi.object().required().messages({
    'object.base': 'Os headers devem ser um objeto',
    'any.required': 'Os headers são obrigatórios'
  }),
  body: Joi.object().required().messages({
    'object.base': 'O body deve ser um objeto',
    'any.required': 'O body é obrigatório'
  })
})

export const updateEndpointSchema = Joi.object({
  name: Joi.string().optional(),
  url: Joi.string().optional(),
  method: Joi.string().optional(),
  headers: Joi.object().optional(),
  body: Joi.object().optional()
})