import prisma from '../database/client.js'

export const checkCollectionExists = async (req, res, next) => {
  try {
    const collection = await prisma.collection.findUnique({
      where: {
        id: req.params.id
      }
    })

    if (!collection) {
      return res.status(404).json({ error: 'Coleção não encontrada' })
    }

    req.collection = collection
    next()
  } catch (error) {
    res.status(500).json({ error: 'Erro ao verificar coleção' })
  }
} 