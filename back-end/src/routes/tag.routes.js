import express from 'express'
import {
  createTag,
  getAllTags,
  getTagById,
  updateTag,
  deleteTag
} from '../controllers/tag.controller.js'
import { checkTagExists } from '../middlewares/tag.middleware.js'

const router = express.Router()

router.post('/', createTag)
router.get('/', getAllTags)
router.get('/:id', checkTagExists, getTagById)
router.put('/:id', checkTagExists, updateTag)
router.delete('/:id', checkTagExists, deleteTag)

export default router 