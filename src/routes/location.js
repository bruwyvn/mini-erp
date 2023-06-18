import { Router } from 'express'
import Location from '../models/location.js'

const routes = new Router()

routes.get('/:id', async (request, response) => {
  const { id } = request.params

  try {
    const location = await Location.findByPk(id)

    if (!location) {
      return response.status(404).json({ error: 'Location not found' })
    }

    response.json(location)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch location' })
  }
})

routes.get('/nameAndType', async (request, response) => {
  const { name, type } = request.query

  try {
    const location = await Location.findOne({
      where: { name, type }
    })

    if (!location) {
      return response.status(404).json({ error: 'Location not found' })
    }

    response.json(location)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch location' })
  }
})

routes.get('/getAll', async (request, response) => {
  try {
    const locations = await Location.findAll()

    response.json(locations)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch locations' })
  }
})

routes.post('', async (request, response) => {
  const { name, type } = request.body

  try {
    const location = await Location.create({ name, type })

    response.status(201).json(location)
  } catch (error) {
    response.status(500).json({ error: 'Failed to create location' })
  }
})

routes.put('/:id', async (request, response) => {
  const { id } = request.params
  const { name, type } = request.body

  try {
    const location = await Location.findByPk(id)

    if (!location) {
      return response.status(404).json({ error: 'Location not found' })
    }

    location.name = name
    location.type = type

    await location.save()

    response.json(location)
  } catch (error) {
    response.status(500).json({ error: 'Failed to update location' })
  }
})

routes.delete('/:id', async (request, response) => {
  const { id } = request.params

  try {
    const location = await Location.findByPk(id)

    if (!location) {
      return response.status(404).json({ error: 'Location not found' })
    }

    await location.destroy()

    response.json({ message: 'Location deleted' })
  } catch (error) {
    response.status(500).json({ error: 'Failed to delete location' })
  }
})

export default routes
