import { Router } from 'express'
import Resource from '../models/resource.js'

const routes = new Router()

routes.get('/:id', async (request, response) => {
  const { id } = request.params

  try {
    const resource = await Resource.findByPk(id)

    if (!resource) {
      return response.status(404).json({ error: 'Resource not found' })
    }

    response.json(resource)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch resource' })
  }
})

routes.get('/getAll', async (request, response) => {
  try {
    const resources = await Resource.findAll()

    response.json(resources)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch resources' })
  }
})

routes.get('/name/:name', async (request, response) => {
  const { name } = request.params

  try {
    const resources = await Resource.findAll({
      where: { name }
    })

    response.json(resources)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch resources' })
  }
})

routes.get('/description/:description', async (request, response) => {
  const { description } = request.params

  try {
    const resources = await Resource.findAll({
      where: { description }
    })

    response.json(resources)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch resources' })
  }
})

routes.post('', async (request, response) => {
  const { name, description } = request.body

  try {
    const resource = await Resource.create({ name, description })

    response.status(201).json(resource)
  } catch (error) {
    response.status(500).json({ error: 'Failed to create resource' })
  }
})

routes.put('/:id', async (request, response) => {
  const { id } = request.params
  const { name, description } = request.body

  try {
    const resource = await Resource.findByPk(id)

    if (!resource) {
      return response.status(404).json({ error: 'Resource not found' })
    }

    resource.name = name
    resource.description = description

    await resource.save()

    response.json(resource)
  } catch (error) {
    response.status(500).json({ error: 'Failed to update resource' })
  }
})

routes.delete('/:id', async (request, response) => {
  const { id } = request.params

  try {
    const resource = await Resource.findByPk(id)

    if (!resource) {
      return response.status(404).json({ error: 'Resource not found' })
    }

    await resource.destroy()

    response.json({ message: 'Resource deleted' })
  } catch (error) {
    response.status(500).json({ error: 'Failed to delete resource' })
  }
})

export default routes
