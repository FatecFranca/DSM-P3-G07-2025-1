import { Router } from 'express'
import { createUser, login, getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/user.controller.js'
import { auth } from '../middlewares/auth.middleware.js'

const router = Router()

router.post('/register', createUser)
router.post('/login', login)

router.get('/', getAllUsers)
router.get('/:id', auth, getUserById)
router.put('/:id', auth, updateUser)
router.delete('/:id', auth, deleteUser)

export default router 