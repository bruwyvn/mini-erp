import { Router } from 'express'
import Profile from '../models/profile.js'

const routes = new Router()

routes.get('/:id', async (request, response) => {
  const { id } = request.params

  try {
    const profile = await Profile.findByPk(id)

    if (!profile) {
      return response.status(404).json({ error: 'Profile not found' })
    }

    response.json(profile)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch profile' })
  }
})

routes.get('/getAll', async (request, response) => {
  try {
    const profiles = await Profile.findAll()

    response.json(profiles)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch profiles' })
  }
})

routes.get('/email/:email', async (request, response) => {
  const { email } = request.params

  try {
    const profile = await Profile.findOne({
      where: { email }
    })

    if (!profile) {
      return response.status(404).json({ error: 'Profile not found' })
    }

    response.json(profile)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch profile' })
  }
})

routes.get('/type/:type', async (request, response) => {
  const { type } = request.params

  try {
    const profiles = await Profile.findAll({
      where: { type }
    })

    response.json(profiles)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch profiles' })
  }
})

routes.post('', async (request, response) => {
  const { name, email, password, type } = request.body

  try {
    const profile = await Profile.create({ name, email, password, type })

    response.status(201).json(profile)
  } catch (error) {
    response.status(500).json({ error: 'Failed to create profile' })
  }
})

routes.put('/:id', async (request, response) => {
  const { id } = request.params
  const { name, email, password, type } = request.body

  try {
    const profile = await Profile.findByPk(id)

    if (!profile) {
      return response.status(404).json({ error: 'Profile not found' })
    }

    profile.name = name
    profile.email = email
    profile.password = password
    profile.type = type

    await profile.save()

    response.json(profile)
  } catch (error) {
    response.status(500).json({ error: 'Failed to update profile' })
  }
})

routes.delete('/:id', async (request, response) => {
    const { id } = request.params
  
    try {
      const profile = await Profile.findByPk(id)
  
      if (!profile) {
        return response.status(404).json({ error: 'Profile not found' })
      }
  
      await profile.destroy()
  
      response.json({ message: 'Profile deleted' })
    } catch (error) {
      response.status(500).json({ error: 'Failed to delete profile' })
    }
  })
  
  export default routes