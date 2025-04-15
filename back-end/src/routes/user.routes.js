import { Router } from 'express'
import { createUser, login, getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/user.controller.js'
import { auth, isAdmin } from '../middlewares/auth.middleware.js'

const router = Router()

// Rotas públicas
router.post('/register', createUser)
router.post('/login', login)

// Rotas protegidas
router.get('/', auth, isAdmin, getAllUsers)
router.get('/:id', auth, getUserById)
router.put('/:id', auth, updateUser)
router.delete('/:id', auth, isAdmin, deleteUser)

export default router 