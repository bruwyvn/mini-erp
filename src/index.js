import express from 'express'
import database from './database.js'
import router from './router.js'
import config from './config.js'

const app = express()

;(async () => {
  await database.sync({ alter: true })
})()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', router)

app.listen(config.PORT, () => {
  console.log(`Listening on port ${config.PORT}`)
})
