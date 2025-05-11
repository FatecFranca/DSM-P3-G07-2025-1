import express from 'express'
import {
  createCollection,
  getAllCollections,
  getCollectionById,
  updateCollection,
  deleteCollection,
  transferCollectionToTeam
} from '../controllers/collection.controller.js'
import { checkCollectionExists } from '../middlewares/collection.middleware.js'
import { auth } from '../middlewares/auth.middleware.js'
import { Router } from 'express'

const router = express.Router()

router.post('/', auth, createCollection)
router.get('/', auth, getAllCollections)
router.get('/:id', auth, checkCollectionExists, getCollectionById)
router.put('/:id', auth, checkCollectionExists, updateCollection)
router.delete('/:id', auth, checkCollectionExists, deleteCollection)
router.post('/transfer', auth, transferCollectionToTeam)

export default router 