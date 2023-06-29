import express from 'express'
import store from './store.js'
import router from './router.js'
import config from './config.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', router)

app.listen(config.PORT, () => {
  console.log(`Listening on port ${config.PORT}`)
})

await store.sync({ alter: true })
