import { Router } from 'express'
import { createTeam, getAllTeams, getTeamById, updateTeam, deleteTeam } from '../controllers/team.controller.js'
import { checkTeamExists } from '../middlewares/team.middleware.js'

const router = Router()

router.post('/', createTeam)
router.get('/', getAllTeams)
router.get('/:id', checkTeamExists, getTeamById)
router.put('/:id', checkTeamExists, updateTeam)
router.delete('/:id', checkTeamExists, deleteTeam)

export default router 