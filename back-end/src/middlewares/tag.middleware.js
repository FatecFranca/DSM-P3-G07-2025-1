import prisma from '../database/client.js'

export const checkTagExists = async (req, res, next) => {
  try {
    const tag = await prisma.tags.findUnique({
      where: {
        id: req.params.id
      }
    })

    if (!tag) {
      return res.status(404).json({ error: 'Tag não encontrada' })
    }

    req.tag = tag
    next()
  } catch (error) {
    res.status(500).json({ error: 'Erro ao verificar tag' })
  }
} 