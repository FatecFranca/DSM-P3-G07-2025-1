import Joi from 'joi'

export const createEnvironmentSchema = Joi.object({
  name: Joi.string().required().trim().min(2).max(50),
  variables: Joi.object().required(),
  collectionId: Joi.string().required()
})

export const updateEnvironmentSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50),
  variables: Joi.object()
})