import { createTagSchema, updateTagSchema } from '../validations/tag.validation.js'
import prisma from '../database/client.js'

export const createTag = async (req, res) => {
  try {
    const { error } = createTagSchema.validate(req.body)
    if (error) {
      return res.status(400).json({ error: error.details[0].message })
    }

    const { name } = req.body

    const tag = await prisma.tags.create({
      data: { name }
    })
    res.status(201).json(tag)
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Tag com este nome já existe' })
    }
    res.status(500).json({ error: 'Erro ao criar tag' })
  }
}

export const getAllTags = async (req, res) => {
  try {
    const tags = await prisma.tags.findMany()
    res.json(tags)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao buscar tags' })
  }
}

export const getTagById = async (req, res) => {
  res.json(req.tag)
}

export const updateTag = async (req, res) => {
  try {
    const { error } = updateTagSchema.validate(req.body)
    if (error) {
      return res.status(400).json({ error: error.details[0].message })
    }

    const { name } = req.body

    const tag = await prisma.tags.update({
      where: {
        id: req.params.id
      },
      data: { name }
    })

    res.json(tag)
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Tag com este nome já existe' })
    }
    res.status(500).json({ error: 'Erro ao atualizar tag' })
  }
}

export const deleteTag = async (req, res) => {
  try {
    await prisma.tags.delete({
      where: {
        id: req.params.id
      }
    })
    res.json({ message: 'Tag removida com sucesso' })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover tag' })
  }
} 