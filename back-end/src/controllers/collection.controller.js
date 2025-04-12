import { createCollectionSchema, updateCollectionSchema } from '../validations/collection.validation.js'
import prisma from '../database/client.js'

export const createCollection = async (req, res) => {
  try {
    const { error } = createCollectionSchema.validate(req.body)
    if (error) {
      return res.status(400).json({ error: error.details[0].message })
    }

    const { name, description, type } = req.body

    const collection = await prisma.collection.create({
      data: { name, description, type }
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
    const collections = await prisma.collection.findMany()
    res.json(collections)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao buscar coleções' })
  }
}

export const getCollectionById = async (req, res) => {
  res.json(req.collection)
}

export const updateCollection = async (req, res) => {
  try {
    const { error } = updateCollectionSchema.validate(req.body)
    if (error) {
      return res.status(400).json({ error: error.details[0].message })
    }

    const { name, description, type } = req.body

    const collection = await prisma.collection.update({
      where: {
        id: req.params.id
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
    await prisma.collection.delete({
      where: {
        id: req.params.id
      }
    })
    res.json({ message: 'Coleção removida com sucesso' })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover coleção' })
  }
} 