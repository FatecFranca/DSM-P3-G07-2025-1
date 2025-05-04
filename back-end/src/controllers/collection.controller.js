import { createCollectionSchema, updateCollectionSchema } from '../validations/collection.validation.js'
import prisma from '../database/client.js'

export const createCollection = async (req, res) => {
  try {
    const { error } = createCollectionSchema.validate(req.body)
    if (error) {
      return res.status(400).json({ error: error.details[0].message })
    }

    const { name, description, type } = req.body
    const { id: userId } = req.user

    const collection = await prisma.collection.create({
      data: {
        name,
        description,
        type,
        userId
      }
    })
    res.status(201).json(collection)
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Coleção com este nome já existe' })
    }
    res.status(500).json({ error: 'Erro ao criar coleção' })
  }
}

export const getAllCollections = async (req, res) => {
  try {
    const { id: userId } = req.user

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { teams: true }
    })

    const teamIds = user.teams.map(team => team.id)

    const collections = await prisma.collection.findMany({
      where: {
        OR: [
          { userId },
          { teamId: { in: teamIds } }
        ]
      },
      include: {
        team: true,
      }
    })
    res.json(collections)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao buscar coleções' })
  }
}

export const getCollectionById = async (req, res) => {
  try {
    const collection = await prisma.collection.findUnique({
      where: {
        id: req.params.id
      },
      include: {
        user: true,
        team: true
      }
    })
    res.json(collection)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar coleção' })
  }
}

export const updateCollection = async (req, res) => {
  try {
    const { error } = updateCollectionSchema.validate(req.body)
    if (error) {
      return res.status(400).json({ error: error.details[0].message })
    }

    const { name, description, type } = req.body
    const { id: userId } = req.user

    const collection = await prisma.collection.update({
      where: {
        id: req.params.id,
        userId
      },
      data: { name, description, type }
    })

    res.json(collection)
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Coleção com este nome já existe' })
    }
    res.status(500).json({ error: 'Erro ao atualizar coleção' })
  }
}

export const deleteCollection = async (req, res) => {
  try {
    const { id: userId } = req.user
    await prisma.collection.delete({
      where: {
        id: req.params.id,
        userId
      }
    })
    res.json({ message: 'Coleção removida com sucesso' })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover coleção' })
  }
}

export const transferCollectionToTeam = async (req, res) => {
  try {
    const { teamId } = req.body
    const { id: userId } = req.user

    if (!teamId) {
      return res.status(400).json({ error: 'ID do time é obrigatório' })
    }

    const collection = await prisma.collection.update({
      where: {
        id: req.params.id,
        userId
      },
      data: {
        teamId,
        userId: null
      }
    })

    res.json(collection)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao transferir coleção para o time' })
  }
}