import express from 'express'
import tagRoutes from './tag.routes.js'
import collectionRoutes from './collection.routes.js'

const router = express.Router()

router.use('/tags', tagRoutes)
router.use('/collections', collectionRoutes)

export default router 