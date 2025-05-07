import prisma from '../database/client.js'

export const createStressTest = async (req, res) => {
  try {
    const { endpoint, method, requests, concurrency, totalTime, avgTime, success, failures } = req.body
    const userId = req.user.id

    const stressTest = await prisma.stressTest.create({
      data: {
        endpoint,
        method,
        requests,
        concurrency,
        totalTime,
        avgTime,
        success,
        failures,
        userId
      }
    })

    res.status(201).json(stressTest)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar teste de stress' })
  }
}

export const getAllStressTests = async (req, res) => {
  try {
    const stressTests = await prisma.stressTest.findMany({
      where: {
        userId: req.user.id
      }
    })
    res.json(stressTests)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar testes de stress' })
  }
}

export const getStressTestById = async (req, res) => {
  try {
    const stressTest = await prisma.stressTest.findUnique({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    })

    if (!stressTest) {
      return res.status(404).json({ error: 'Teste de stress não encontrado' })
    }

    res.json(stressTest)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar teste de stress' })
  }
}

export const updateStressTest = async (req, res) => {
  try {
    const { endpoint, method, requests, concurrency, totalTime, avgTime, success, failures } = req.body

    const stressTest = await prisma.stressTest.update({
      where: {
        id: req.params.id,
        userId: req.user.id
      },
      data: {
        endpoint,
        method,
        requests,
        concurrency,
        totalTime,
        avgTime,
        success,
        failures
      }
    })

    res.json(stressTest)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar teste de stress' })
  }
}

export const deleteStressTest = async (req, res) => {
  try {
    const stressTest = await prisma.stressTest.delete({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    })

    if (!stressTest) {
      return res.status(404).json({ error: 'Teste de stress não encontrado' })
    }

    res.json({ message: 'Teste de stress removido com sucesso' })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover teste de stress' })
  }
}