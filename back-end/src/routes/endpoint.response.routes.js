import { Router } from 'express'
import { createEndpointResponse, getAllEndpointResponses, getEndpointResponseById, updateEndpointResponse, deleteEndpointResponse } from '../controllers/endpoint.response.controller.js'
import { auth } from '../middlewares/auth.middleware.js'

const router = Router()

router.post('/', auth, createEndpointResponse)
router.get('/', auth, getAllEndpointResponses)
router.get('/:id', auth, getEndpointResponseById)
router.put('/:id', auth, updateEndpointResponse)
router.delete('/:id', auth, deleteEndpointResponse)

export default router