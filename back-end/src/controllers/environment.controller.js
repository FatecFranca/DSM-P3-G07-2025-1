import { createEnvironmentSchema, updateEnvironmentSchema } from '../validations/environment.validation.js'
import prisma from '../database/client.js'

export const createEnvironment = async (req, res) => {
  try {
    const { error } = createEnvironmentSchema.validate(req.body)
    if (error) {
      return res.status(400).json({ error: error.details[0].message })
    }

    const { name, variables, collectionId } = req.body

    const environment = await prisma.environment.create({
      data: {
        name,
        variables,
        collectionId
      }
    })
    res.status(201).json(environment)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar ambiente' })
  }
}

export const getAllEnvironments = async (req, res) => {
  try {
    const { collectionId } = req.params

    const environments = await prisma.environment.findMany({
      where: {
        collectionId
      }
    })
    res.json(environments)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar ambientes' })
  }
}

export const getEnvironmentById = async (req, res) => {
  try {
    const environment = await prisma.environment.findUnique({
      where: {
        id: req.params.id
      }
    })
    res.json(environment)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar ambiente' })
  }
}

export const updateEnvironment = async (req, res) => {
  try {
    const { error } = updateEnvironmentSchema.validate(req.body)
    if (error) {
      return res.status(400).json({ error: error.details[0].message })
    }

    const { name, variables } = req.body

    const environment = await prisma.environment.update({
      where: {
        id: req.params.id
      },
      data: { 
        name,
        variables
      }
    })

    res.json(environment)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar ambiente' })
  }
}

export const deleteEnvironment = async (req, res) => {
  try {
    await prisma.environment.delete({
      where: {
        id: req.params.id
      }
    })
    res.json({ message: 'Ambiente removido com sucesso' })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover ambiente' })
  }
}