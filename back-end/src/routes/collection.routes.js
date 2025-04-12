import express from 'express'
import {
  createCollection,
  getAllCollections,
  getCollectionById,
  updateCollection,
  deleteCollection
} from '../controllers/collection.controller.js'
import { checkCollectionExists } from '../middlewares/collection.middleware.js'

const router = express.Router()

router.post('/', createCollection)
router.get('/', getAllCollections)
router.get('/:id', checkCollectionExists, getCollectionById)
router.put('/:id', checkCollectionExists, updateCollection)
router.delete('/:id', checkCollectionExists, deleteCollection)

export default router 