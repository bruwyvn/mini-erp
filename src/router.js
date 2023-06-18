import { Router } from 'express'
import authentication from './routes/authentication.js'
import location from './routes/location.js'
import movimentItem from './routes/moviment-item.js'
import moviment from './routes/moviment.js'
import profile from './routes/profile.js'
import resource from './routes/resource.js'

// import middleware from './middleware.js'

const router = new Router()

router.use('/authentication', authentication)
router.use('/location', location)
router.use('/movimentItem', movimentItem)
router.use('/moviment', moviment)
router.use('/profile', profile)
router.use('/resource', resource)


export default router
