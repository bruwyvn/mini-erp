import { Router } from 'express'
import middleware from './middleware.js'

import Profile from './models/profile.js'

const router = new Router()

router.use('/auth', async (request, response) => {
  const { email, password } = request.body // TODO: Use password hash instead of a plain one
  const profile = await Profile.findOne({ where: { email } })
  if (!profile) {
    return response.status(401).json({ error: 'Invalid email or password' })
  }

  // TODO: Decode password hash logic
  if (profile.password !== password) {
    return response.status(401).json({ error: 'Invalid email or password' })
  }

  const token = jwt.sign({ profileId: profile.profileId }, config.SECRET_KEY, {
    expiresIn: 1800
  })
  response.json({ token })
})

router.get('/protected', middleware, async ({ profile }, response) => {
  const hasPermission = profile.Roles.some((role) =>
    role.Permissions.some(
      (permission) => permission.name === 'access_protected'
    )
  )
  if (!hasPermission) {
    return response.status(403).json({ error: 'Unauthorized' })
  }
  response.json({
    message: 'You have access to the protected endpoint'
  })
})

export default router
