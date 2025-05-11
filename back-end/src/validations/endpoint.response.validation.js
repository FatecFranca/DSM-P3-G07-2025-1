import Joi from 'joi'

export const createEndpointResponseSchema = Joi.object({
  endpointId: Joi.string().required().messages({
    'string.empty': 'O ID do endpoint é obrigatório',
    'any.required': 'O ID do endpoint é obrigatório'
  }),
  response: Joi.object().required().messages({
    'object.base': 'A resposta deve ser um objeto',
    'any.required': 'A resposta é obrigatória'
  }),
  statusCode: Joi.number().required().messages({
    'number.base': 'O código de status deve ser um número',
    'any.required': 'O código de status é obrigatório'
  })
})

export const updateEndpointResponseSchema = Joi.object({
  endpointId: Joi.string().optional(),
  response: Joi.object().optional(),
  statusCode: Joi.number().optional()
})