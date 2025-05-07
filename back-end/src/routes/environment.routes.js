import express from 'express'
import {
  createEnvironment,
  getAllEnvironments,
  getEnvironmentById,
  updateEnvironment,
  deleteEnvironment
} from '../controllers/environment.controller.js'
import { checkEnvironmentExists } from '../middlewares/environment.middleware.js'
import { auth } from '../middlewares/auth.middleware.js'
import { Router } from 'express'

const router = Router()

router.post('/', auth, createEnvironment)
router.get('/', auth, getAllEnvironments)
router.get('/:id', auth, checkEnvironmentExists, getEnvironmentById)
router.put('/:id', auth, checkEnvironmentExists, updateEnvironment)
router.delete('/:id', auth, checkEnvironmentExists, deleteEnvironment)

export default router