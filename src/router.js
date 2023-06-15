import { Router } from 'express'
import authentication from './routes/authentication.js'
// import middleware from './middleware.js'

const router = new Router()

router.use('/authentication', authentication)

// router.get('/protected', middleware, async ({ profile }, response) => {
//   const hasPermission = profile.Roles.some((role) =>
//     role.Permissions.some(
//       (permission) => permission.name === 'access_protected'
//     )
//   )
//   if (!hasPermission) {
//     return response.status(403).json({ error: 'Unauthorized' })
//   }
//   response.json({
//     message: 'You have access to the protected endpoint'
//   })
// })

export default router
