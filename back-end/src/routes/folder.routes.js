import express from 'express'
import { createFolder, getAllFolders, getFolderById, getFoldersByCollection, updateFolder, deleteFolder } from '../controllers/folder.controller.js'
import { Router } from 'express'
const router = express.Router()

router.post('/', createFolder)
router.get('/', getAllFolders)
router.get('/:id', getFolderById)
router.get('/collection/:collectionId', getFoldersByCollection)
router.put('/:id', updateFolder)
router.delete('/:id', deleteFolder)

export default router