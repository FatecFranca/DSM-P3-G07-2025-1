import { createEndpointSchema, updateEndpointSchema } from '../validations/endpoint.validation.js'
import prisma from '../database/client.js'

export const createEndpoint = async (req, res) => {
  try {
    const { error } = createEndpointSchema.validate(req.body)
    if (error) {
      return res.status(400).json({ error: error.details[0].message })
    }

    const { name, url, method, headers, body } = req.body

    const endpoint = await prisma.endpoint.create({
      data: {
        name,
        url,
        method,
        headers,
        body
      }
    })
    res.status(201).json(endpoint)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar endpoint' })
  }
}

export const getAllEndpoints = async (req, res) => {
  try {
    const endpoints = await prisma.endpoint.findMany()
    res.json(endpoints)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao buscar endpoints' })
  }
}

export const getEndpointById = async (req, res) => {
  try {
    const endpoint = await prisma.endpoint.findUnique({
      where: {
        id: req.params.id
      }
    })
    
    if (!endpoint) {
      return res.status(404).json({ error: 'Endpoint não encontrado' })
    }

    res.json(endpoint)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar endpoint' })
  }
}

export const updateEndpoint = async (req, res) => {
  try {
    const { error } = updateEndpointSchema.validate(req.body)
    if (error) {
      return res.status(400).json({ error: error.details[0].message })
    }

    const { name, url, method, headers, body } = req.body

    const endpoint = await prisma.endpoint.update({
      where: {
        id: req.params.id
      },
      data: { 
        name,
        url,
        method,
        headers,
        body
      }
    })

    res.json(endpoint)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar endpoint' })
  }
}

export const deleteEndpoint = async (req, res) => {
  try {
    const endpoint = await prisma.endpoint.delete({
      where: {
        id: req.params.id
      }
    })

    if (!endpoint) {
      return res.status(404).json({ error: 'Endpoint não encontrado' })
    }

    res.json({ message: 'Endpoint removido com sucesso' })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover endpoint' })
  }
}