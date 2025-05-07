import { Router } from 'express'
import { createStressTest, getAllStressTests, getStressTestById, updateStressTest, deleteStressTest } from '../controllers/stress.test.controller.js'
import { auth } from '../middlewares/auth.middleware.js'

const router = Router()

router.post('/', auth, createStressTest)
router.get('/', auth, getAllStressTests)
router.get('/:id', auth, getStressTestById)
router.put('/:id', auth, updateStressTest)
router.delete('/:id', auth, deleteStressTest)

export default router