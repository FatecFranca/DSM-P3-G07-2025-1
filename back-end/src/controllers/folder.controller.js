import { createFolderSchema, updateFolderSchema } from '../validations/folder.validation.js'
import prisma from '../database/client.js'

export const createFolder = async (req, res) => {
  try {
    const { error } = createFolderSchema.validate(req.body)
    if (error) {
      return res.status(400).json({ error: error.details[0].message })
    }

    const { name, description, collectionId } = req.body

    const folder = await prisma.folder.create({
      data: {
        name,
        description,
        collection: {
          connect: { id: collectionId }
        }
      },
      include: {
        collection: true
      }
    })

    res.status(201).json(folder)
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Pasta com este nome já existe na coleção' })
    }
    res.status(500).json({ error: 'Erro ao criar pasta' })
  }
}

export const getAllFolders = async (req, res) => {
  try {
    const folders = await prisma.folder.findMany({
      include: {
        collection: true
      }
    })
    res.json(folders)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pastas' })
  }
}

export const getFolderById = async (req, res) => {
  try {
    const { id } = req.params
    const folder = await prisma.folder.findUnique({
      where: { id },
      include: {
        collection: true
      }
    })

    if (!folder) {
      return res.status(404).json({ error: 'Pasta não encontrada' })
    }

    res.json(folder)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pasta' })
  }
}

export const getFoldersByCollection = async (req, res) => {
  try {
    const { collectionId } = req.params
    const folders = await prisma.folder.findMany({
      where: {
        collectionId
      },
      include: {
        collection: true
      }
    })
    res.json(folders)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pastas da coleção' })
  }
}

export const updateFolder = async (req, res) => {
  try {
    const { error } = updateFolderSchema.validate(req.body)
    if (error) {
      return res.status(400).json({ error: error.details[0].message })
    }

    const { id } = req.params
    const { name, description, collectionId } = req.body

    const folder = await prisma.folder.findUnique({
      where: { id }
    })

    if (!folder) {
      return res.status(404).json({ error: 'Pasta não encontrada' })
    }

    const data = { name, description }
    if (collectionId) {
      data.collection = {
        connect: { id: collectionId }
      }
    }

    const updatedFolder = await prisma.folder.update({
      where: { id },
      data,
      include: {
        collection: true
      }
    })

    res.json(updatedFolder)
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Pasta com este nome já existe na coleção' })
    }
    res.status(500).json({ error: 'Erro ao atualizar pasta' })
  }
}

export const deleteFolder = async (req, res) => {
  try {
    const { id } = req.params

    const folder = await prisma.folder.findUnique({
      where: { id }
    })

    if (!folder) {
      return res.status(404).json({ error: 'Pasta não encontrada' })
    }

    await prisma.folder.delete({
      where: { id }
    })

    res.json({ message: 'Pasta removida com sucesso' })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover pasta' })
  }
}     

export const addTagToFolder = async (req, res) => {
  try {
    const { id } = req.params
    const { tagId } = req.body

    const folder = await prisma.folder.update({
      where: { id },
      data: { tags: { connect: { id: tagId } } }
    })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar tag à pasta' })
  }
}

export const removeTagFromFolder = async (req, res) => {
  try {
    const { id } = req.params
    const { tagId } = req.body 

    const folder = await prisma.folder.update({
      where: { id },
      data: { tags: { disconnect: { id: tagId } } }
    })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover tag da pasta' })
  }
}

export const addEndpointToFolder = async (req, res) => {
  try {
    const { id } = req.params
    const { endpointId } = req.body

    const folder = await prisma.folder.update({
      where: { id },
      data: { endpoints: { connect: { id: endpointId } } }
    })    
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar endpoint à pasta' })
  }
}

export const removeEndpointFromFolder = async (req, res) => {
  try {
    const { id } = req.params
    const { endpointId } = req.body

    const folder = await prisma.folder.update({
      where: { id },
      data: { endpoints: { disconnect: { id: endpointId } } }
    })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover endpoint da pasta' })
  }
}