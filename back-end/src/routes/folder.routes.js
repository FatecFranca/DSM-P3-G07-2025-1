import express from 'express'
import { createFolder, getAllFolders, getFolderById, getFoldersByCollection, updateFolder, deleteFolder, addTagToFolder, removeTagFromFolder, addEndpointToFolder, removeEndpointFromFolder } from '../controllers/folder.controller.js'
import { Router } from 'express'
const router = express.Router()

router.post('/', createFolder)
router.get('/', getAllFolders)
router.get('/:id', getFolderById)
router.get('/collection/:collectionId', getFoldersByCollection)
router.put('/:id', updateFolder)
router.delete('/:id', deleteFolder)
router.delete('/:id/tags', removeTagFromFolder)
router.post('/:id/endpoints', addEndpointToFolder)
router.delete('/:id/endpoints', removeEndpointFromFolder)

export default router