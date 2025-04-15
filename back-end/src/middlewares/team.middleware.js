import prisma from '../database/client.js'

export const checkTeamExists = async (req, res, next) => {
  try {
    const team = await prisma.team.findUnique({
      where: {
        id: req.params.id
      }
    })

    if (!team) {
      return res.status(404).json({ error: 'Time não encontrado' })
    }

    req.team = team
    next()
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar time' })
  }
} 