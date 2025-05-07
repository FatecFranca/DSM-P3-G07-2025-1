import prisma from '../database/client.js'

export const checkEnvironmentExists = async (req, res, next) => {
  try {
    const environment = await prisma.environment.findUnique({
      where: {
        id: req.params.id
      }
    })

    if (!environment) {
      return res.status(404).json({ error: 'Ambiente não encontrado' })
    }

    req.environment = environment
    next()
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar ambiente' })
  }
}