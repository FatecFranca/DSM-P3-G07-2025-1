import { Router } from 'express'
import { createEndpoint, getAllEndpoints, getEndpointById, updateEndpoint } from '../controllers/endpoint.controller.js'
import { auth } from '../middlewares/auth.middleware.js'

const router = Router()

router.post('/', auth, createEndpoint)
router.get('/', auth, getAllEndpoints)
router.get('/:id', auth, getEndpointById)
router.put('/:id', auth, updateEndpoint)

export default router