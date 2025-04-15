import Joi from 'joi'

export const createFolderSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'O nome é obrigatório',
    'any.required': 'O nome é obrigatório'
  }),
  description: Joi.string().allow('').optional(),
  collectionId: Joi.string().required().messages({
    'string.empty': 'O ID da coleção é obrigatório',
    'any.required': 'O ID da coleção é obrigatório'
  })
})

export const updateFolderSchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().allow('').optional(),
  collectionId: Joi.string().optional()
}) 