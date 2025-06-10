import { createEndpointResponseSchema, updateEndpointResponseSchema } from '../validations/endpoint.response.validation.js'
import prisma from '../database/client.js'

export const createEndpointResponse = async (req, res) => {
  try {
    const { error } = createEndpointResponseSchema.validate(req.body)
    if (error) {
      return res.status(400).json({ error: error.details[0].message })
    }

    const { endpointId, response, statusCode } = req.body

    const endpointResponse = await prisma.endpointResponse.create({
      data: {
        endpointId,
        response,
        statusCode
      }
    })
    res.status(201).json(endpointResponse)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar resposta do endpoint' })
  }
}

export const getAllEndpointResponses = async (req, res) => {
  try {
    const endpointResponses = await prisma.endpointResponse.findMany()
    res.json(endpointResponses)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao buscar respostas dos endpoints' })
  }
}

export const getEndpointResponseById = async (req, res) => {
  try {
    const endpointResponse = await prisma.endpointResponse.findUnique({
      where: {
        id: req.params.id
      }
    })

    if (!endpointResponse) {
      return res.status(404).json({ error: 'Resposta do endpoint não encontrada' })
    }

    res.json(endpointResponse)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar resposta do endpoint' })
  }
}

export const updateEndpointResponse = async (req, res) => {
  try {
    const { error } = updateEndpointResponseSchema.validate(req.body)
    if (error) {
      return res.status(400).json({ error: error.details[0].message })
    }

    const { endpointId, response, statusCode } = req.body

    const endpointResponse = await prisma.endpointResponse.update({
      where: {
        id: req.params.id
      },
      data: {
        endpointId,
        response,
        statusCode
      }
    })

    res.json(endpointResponse)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar resposta do endpoint' })
  }
}

export const deleteEndpointResponse = async (req, res) => {
  try {
    const endpointResponse = await prisma.endpointResponse.delete({
      where: {
        id: req.params.id
      }
    })

    if (!endpointResponse) {
      return res.status(404).json({ error: 'Resposta do endpoint não encontrada' })
    }

    res.json({ message: 'Resposta do endpoint removida com sucesso' })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover resposta do endpoint' })
  }
}

export const addTagToEndpointResponse = async (req, res) => {
  try {
    const { endpointResponseId, tagId } = req.body
    const endpointResponse = await prisma.endpointResponse.update({
      where: {
        id: endpointResponseId
      },
      data: {
        tags: { connect: { id: tagId } }
      }
    })
    res.json(endpointResponse)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar tag à resposta do endpoint' })
  }
}

export const removeTagFromEndpointResponse = async (req, res) => {
  try {
    const { endpointResponseId, tagId } = req.body
    const endpointResponse = await prisma.endpointResponse.update({
      where: {
        id: endpointResponseId
      },
      data: {
        tags: { disconnect: { id: tagId } }
      }
    })
    res.json(endpointResponse)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover tag da resposta do endpoint' })
  }
}