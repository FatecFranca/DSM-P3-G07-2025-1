import Joi from 'joi'

export const updateProfileSchema = Joi.object({
  name: Joi.string().optional(),
  bio: Joi.string().optional(),
  location: Joi.string().optional(),
  avatar: Joi.string().uri().optional(),
  phone: Joi.string().optional(),
  technologies: Joi.array().items(Joi.string()).optional(),
  education: Joi.array().items(Joi.object({
    institution: Joi.string().required(),
    degree: Joi.string().required(),
    field: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().optional()
  })).optional(),
  experience: Joi.array().items(Joi.object({
    company: Joi.string().required(),
    position: Joi.string().required(),
    description: Joi.string().optional(),
    startDate: Joi.date().required(),
    endDate: Joi.date().optional()
  })).optional(),
  languages: Joi.array().items(Joi.object({
    language: Joi.string().required(),
    proficiency: Joi.string().valid('Básico', 'Intermediário', 'Avançado', 'Fluente', 'Nativo').required()
  })).optional(),
  interests: Joi.array().items(Joi.string()).optional(),
  socialMedia: Joi.array().items(Joi.object({
    platform: Joi.string().required(),
    url: Joi.string().uri().required()
  })).optional()
}).messages({
  'string.uri': 'URL inválida',
  'date.base': 'Data inválida'
})

