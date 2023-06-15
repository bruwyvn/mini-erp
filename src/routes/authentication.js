import { Router } from 'express'
import { Op } from 'sequelize'
import jwt from 'jsonwebtoken'
import config from '../config.js'

import Profile from '../models/profile.js'

const authentication = new Router()

authentication.post('/', async (request, response) => {
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

export default authentication
