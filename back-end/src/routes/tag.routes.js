import express from 'express'
import {
  createTag,
  getAllTags,
  getTagById,
  updateTag,
  deleteTag
} from '../controllers/tag.controller.js'
import { checkTagExists } from '../middlewares/tag.middleware.js'
import { auth } from '../middlewares/auth.middleware.js'
import { Router } from 'express'
const router = express.Router()

router.post('/', auth, createTag)
router.get('/', auth, getAllTags)
router.get('/:id', auth, checkTagExists, getTagById)
router.put('/:id', auth, checkTagExists, updateTag)
router.delete('/:id', auth, checkTagExists, deleteTag)

export default router 