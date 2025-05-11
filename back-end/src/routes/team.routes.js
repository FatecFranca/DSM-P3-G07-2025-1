import { Router } from 'express'
import { createTeam, getAllTeams, getTeamById, updateTeam, deleteTeam, getTeamsByUserID, getUsersOfATeam } from '../controllers/team.controller.js'
import { checkTeamExists } from '../middlewares/team.middleware.js'
import { auth } from '../middlewares/auth.middleware.js'

const router = Router()

router.post('/', auth, createTeam)
router.get('/user', auth, getTeamsByUserID)
router.get('/', auth, getAllTeams)
router.get('/:id', auth, checkTeamExists, getTeamById)
router.put('/:id', auth, checkTeamExists, updateTeam)
router.delete('/:id', auth, checkTeamExists, deleteTeam)
router.get('/users/:id', auth, getUsersOfATeam)



export default router 