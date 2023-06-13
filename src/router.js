import { Router } from 'express'
import { Op } from 'sequelize'
import config from './config.js'
// import middleware from './middleware.js'

import Profile from './models/profile.js'

const router = new Router()

router.use('/authenticate', async (request, response) => {
  const { login, password } = request.body
  const profile = await Profile.findOne({
    where: {
      [Op.or]: [{ name: login }, { email: login }]
    }
  })
  if (!profile) {
    return response.status(401).json({ error: 'Invalid login or password' })
  }

  // TODO: Decode password hash logic
  if (profile.password !== password) {
    return response.status(401).json({ error: 'Invalid login or password' })
  }

  const token = jwt.sign({ id: profile.id }, config.SECRET_KEY, {
    expiresIn: 1800
  })
  response.json({ token })
})

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
