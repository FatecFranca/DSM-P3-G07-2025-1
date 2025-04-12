import express, { json, urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import tagsRouter from './routes/tag.routes.js'
import collectionsRouter from './routes/collection.routes.js'       

const app = express()

app.use(logger('dev'))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/tags', tagsRouter)
app.use('/collections', collectionsRouter)
export default app
