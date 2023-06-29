import { Router } from 'express'
import authentication from './routes/authentication.js'
import location from './routes/location.js'
import movementItem from './routes/movement-item.js'
import movement from './routes/movement.js'
import profile from './routes/profile.js'
import resource from './routes/resource.js'

const router = new Router()

router.use('/authentication', authentication)
router.use('/location', location)
router.use('/movementItem', movementItem)
router.use('/movement', movement)
router.use('/profile', profile)
router.use('/resource', resource)


export default router
