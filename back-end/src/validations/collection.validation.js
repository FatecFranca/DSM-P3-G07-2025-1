import Joi from 'joi'

export const createCollectionSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'O nome da coleção é obrigatório',
    'any.required': 'O nome da coleção é obrigatório'
  }),
  description: Joi.string().allow('').optional(),
  type: Joi.string().valid('development', 'production', 'staging').required().messages({
    'any.only': 'O tipo deve ser development, production ou staging',
    'any.required': 'O tipo da coleção é obrigatório'
  })
})

export const updateCollectionSchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().allow('').optional(),
  type: Joi.string().valid('development', 'production', 'staging').optional()
}) 