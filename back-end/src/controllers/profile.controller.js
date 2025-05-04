import { updateProfileSchema } from '../validations/profile.validation.js'
import prisma from '../database/client.js'

export const getProfile = async (req, res) => {
  try {
    const { id } = req.user
    const profile = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        bio: true,
        location: true,
        avatar: true,
        email: true,
        phone: true,
        technologies: true,
        education: true,
        experience: true,
        languages: true,
        interests: true,
        socialMedia: true,
        teams: true,
        createdAt: true,
        updatedAt: true
      },
      include: {
        socialMedia: true,
      }
    })

    if (!profile) {
      return res.status(404).json({ error: 'Perfil não encontrado' })
    }

    res.json(profile)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao buscar perfil' })
  }
}

export const updateProfile = async (req, res) => {
  try {
    const { error } = updateProfileSchema.validate(req.body)
    if (error) {
      return res.status(400).json({ error: error.details[0].message })
    }

    const { id } = req.user
    const {
      name,
      bio,
      location,
      avatar,
      phone,
      technologies,
      education,
      experience,
      languages,
      interests,
      socialMedia
    } = req.body

    const profile = await prisma.user.findUnique({
      where: { id }
    })

    if (!profile) {
      return res.status(404).json({ error: 'Perfil não encontrado' })
    }

    const updatedProfile = await prisma.user.update({
      where: { id },
      data: {
        name,
        bio,
        location,
        avatar,
        phone,
        technologies,
        education,
        experience,
        languages,
        interests,
        socialMedia: {
          deleteMany: {},
          create: socialMedia
        }
      },
      select: {
        id: true,
        name: true,
        bio: true,
        location: true,
        avatar: true,
        email: true,
        phone: true,
        technologies: true,
        education: true,
        experience: true,
        languages: true,
        interests: true,
        socialMedia: true,
        teams: true,
        createdAt: true,
        updatedAt: true
      }
    })

    res.json(updatedProfile)
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Email já cadastrado' })
    }
    res.status(500).json({ error: 'Erro ao atualizar perfil' })
  }
}