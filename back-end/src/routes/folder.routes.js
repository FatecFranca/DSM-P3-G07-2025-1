import { createFolder, getAllFolders, getFolderById, getFoldersByCollection, updateFolder, deleteFolder } from '../controllers/folder.controller.js'
const router = express.Router()

router.post('/', createFolder)
router.get('/', getAllFolders)
router.get('/:id', getFolderById)
router.get('/collection/:collectionId', getFoldersByCollection)
router.put('/:id', updateFolder)
router.delete('/:id', deleteFolder)

export default router 