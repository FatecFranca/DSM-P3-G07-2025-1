import Joi from 'joi'

export const createTeamSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'O nome é obrigatório',
    'any.required': 'O nome é obrigatório'
  }),
  description: Joi.string().allow('').optional(),
  imageUrl: Joi.string().allow('').optional()
})

export const updateTeamSchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().allow('').optional(),
  imageUrl: Joi.string().allow('').optional()
}) 