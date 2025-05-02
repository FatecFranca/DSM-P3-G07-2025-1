import express from 'express'
import tagRoutes from './tag.routes.js'
import collectionRoutes from './collection.routes.js'
import userRoutes from './user.routes.js'
import teamRoutes from './team.routes.js'

const router = express.Router()

router.use('/tags', tagRoutes)
router.use('/collections', collectionRoutes)
router.use('/users', userRoutes)
router.use('/teams', teamRoutes)

export default router 