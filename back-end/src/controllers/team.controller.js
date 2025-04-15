import { createTeamSchema, updateTeamSchema } from '../validations/team.validation.js'
import prisma from '../database/client.js'

export const createTeam = async (req, res) => {
  try {
    const { error } = createTeamSchema.validate(req.body)
    if (error) {
      return res.status(400).json({ error: error.details[0].message })
    }

    const { name, description, imageUrl } = req.body

    const team = await prisma.team.create({
      data: { name, description, imageUrl }
    })
    res.status(201).json(team)
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Time com este nome já existe' })
    }
    res.status(500).json({ error: 'Erro ao criar time' })
  }
}

export const getAllTeams = async (req, res) => {
  try {
    const teams = await prisma.team.findMany()
    res.json(teams)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao buscar times' })
  }
}

export const getTeamById = async (req, res) => {
  res.json(req.team)
}

export const updateTeam = async (req, res) => {
  try {
    const { error } = updateTeamSchema.validate(req.body)
    if (error) {
      return res.status(400).json({ error: error.details[0].message })
    }

    const { name, description, imageUrl } = req.body

    const team = await prisma.team.update({
      where: {
        id: req.params.id
      },
      data: { name, description, imageUrl }
    })

    res.json(team)
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Time com este nome já existe' })
    }
    res.status(500).json({ error: 'Erro ao atualizar time' })
  }
}

export const deleteTeam = async (req, res) => {
  try {
    await prisma.team.delete({
      where: {
        id: req.params.id
      }
    })
    res.json({ message: 'Time removido com sucesso' })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover time' })
  }
} 