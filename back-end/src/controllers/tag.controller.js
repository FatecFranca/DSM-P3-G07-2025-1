import { createTagSchema, updateTagSchema } from '../validations/tag.validation.js'
import prisma from '../database/client.js'

export const createTag = async (req, res) => {
  try {
    const { error } = createTagSchema.validate(req.body)
    if (error) {
      return res.status(400).json({ error: error.details[0].message })
    }

    const { name, userId } = req.body

    const tag = await prisma.tags.create({
      data: { 
        name,
        userId
      }
    })
    res.status(201).json(tag)
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Tag com este nome já existe' })
    }
    res.status(500).json({ error: 'Erro ao criar tag' })
  }
}

export const getAllTags = async (req, res) => {
  try {
    const { userId } = req.body
    const tags = await prisma.tags.findMany({
      where: {
        userId
      }
    })
    res.json(tags)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao buscar tags' })
  }
}

export const getTagById = async (req, res) => {
  try {
    const { id } = req.params
    const { userId } = req.body

    const tag = await prisma.tags.findFirst({
      where: {
        id,
        userId
      }
    })

    if (!tag) {
      return res.status(404).json({ error: 'Tag não encontrada' })
    }

    res.json(tag)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tag' })
  }
}

export const updateTag = async (req, res) => {
  try {
    const { error } = updateTagSchema.validate(req.body)
    if (error) {
      return res.status(400).json({ error: error.details[0].message })
    }

    const { name, userId } = req.body
    const { id } = req.params

    const existingTag = await prisma.tags.findFirst({
      where: {
        id,
        userId
      }
    })

    if (!existingTag) {
      return res.status(404).json({ error: 'Tag não encontrada' })
    }

    const tag = await prisma.tags.update({
      where: {
        id
      },
      data: { name }
    })

    res.json(tag)
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Tag com este nome já existe' })
    }
    res.status(500).json({ error: 'Erro ao atualizar tag' })
  }
}

export const deleteTag = async (req, res) => {
  try {
    const { id } = req.params
    const { userId } = req.body

    const existingTag = await prisma.tags.findFirst({
      where: {
        id,
        userId
      }
    })

    if (!existingTag) {
      return res.status(404).json({ error: 'Tag não encontrada' })
    }

    await prisma.tags.delete({
      where: {
        id
      }
    })
    res.json({ message: 'Tag removida com sucesso' })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover tag' })
  }
} 