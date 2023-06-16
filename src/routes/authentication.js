import { Router } from 'express'
import { Op } from 'sequelize'
import jwt from 'jsonwebtoken'
import config from '../config.js'

import Profile from '../models/profile.js'

const authentication = new Router()

authentication.post('/', async (request, response) => {
  const profile = await Profile.findOne({
    where: {
      [Op.or]: [{ name: request.login }, { email: request.login }]
    }
  })

  if (!profile) {
    return response.status(401).json({ error: 'Invalid login or password' })
  }

  // TODO: Define utils architecture and move to function on it.
  const encoder = new TextEncoder()
  const data = encoder.encode(body.password)
  const hashBuffer = await crypto.subtle.digest(config.HASH_ALGORITHM, data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hash = hashArray
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')

  if (profile.password !== hash) {
    return response.status(401).json({ error: 'Invalid login or password' })
  }

  const token = jwt.sign({ id: profile.id }, config.SECRET_KEY, {
    expiresIn: 1800
  })

  response.json({ token })
})

export default authentication
