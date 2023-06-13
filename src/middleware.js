import jwt from 'jsonwebtoken'
import config from './config.js'

import Profile from './models/profile.js'

const middleware = async (request, response, next) => {
  const authHeader = request.headers.authorization
  if (!authHeader) {
    return response.status(401).json({ error: 'Authorization header required' })
  }
  const token = authHeader.split(' ')[1]
  try {
    const decodedToken = jwt.verify(token, config.SECRET_KEY)
    const profile = await Profile.findByPk(decodedToken.id)
    // const profile = await Profile.findByPk(decodedToken.profileId, {
    //   include: [{ model: Role, include: [Permission] }]
    // })
    if (!profile) {
      return response.status(401).json({ error: 'Profile not found' })
    }

    request.profile = profile
    next()
  } catch {
    return response.status(401).json({ error: 'Invalid token' })
  }
}

export default middleware
