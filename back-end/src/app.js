import express, { json, urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import tagsRouter from './routes/tag.routes.js'
import collectionsRouter from './routes/collection.routes.js'   
import usersRouter from './routes/user.routes.js'
import teamsRouter from './routes/team.routes.js'
import profileRouter from './routes/profile.routes.js'

const app = express()

app.use(logger('dev'))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/tags', tagsRouter)
app.use('/collections', collectionsRouter)
app.use('/users', usersRouter)
app.use('/teams', teamsRouter)
app.use('/profile', profileRouter)
export default app
