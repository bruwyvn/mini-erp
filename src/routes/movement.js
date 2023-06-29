import { Router } from 'express'
import Movement from '../models/movement.js'
import MovementItem from '../models/movement-item.js'

const routes = new Router()

// Rota para obter um movimento por ID
routes.get('/:id', async (request, response) => {
  const { id } = request.params

  try {
    const movement = await Movement.findByPk(id, {
      include: MovementItem
    })

    if (!movement) {
      return response.status(404).json({ error: 'Movement not found' })
    }

    response.json(movement)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch movement' })
  }
})

// Rota para obter todos os movimentos
routes.get('/getAll', async (request, response) => {
  try {
    const movements = await Movement.findAll({
      include: MovementItem
    })

    response.json(movements)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch movements' })
  }
})

// Rota para obter movimentos por data inicial
routes.get('/initialDate', async (request, response) => {
  const { startDate } = request.query

  try {
    const movements = await Movement.findAll({
      where: { startTime: startDate },
      include: MovementItem
    })

    response.json(movements)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch movements' })
  }
})

// Rota para obter movimentos por data final
routes.get('/finalDate', async (request, response) => {
  const { endDate } = request.query

  try {
    const movements = await Movement.findAll({
      where: { endTime: endDate },
      include: MovementItem
    })

    response.json(movements)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch movements' })
  }
})

// Rota para obter movimentos entre uma data inicial e final
routes.get('/initialDateAndFinalDate', async (request, response) => {
  const { startDate, endDate } = request.query

  try {
    const movements = await Movement.findAll({
      where: { startTime: startDate, endTime: endDate },
      include: MovementItem
    })

    response.json(movements)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch movements' })
  }
})

// Rota para obter movimentos por ID de Location
routes.get('/location/:id', async (request, response) => {
  const { id } = request.params

  try {
    const movements = await Movement.findAll({
      include: [
        { model: Location, as: 'origin', where: { id } },
        { model: Location, as: 'destination', where: { id } }
      ],
      include: MovementItem
    })

    response.json(movements)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch movements' })
  }
})

routes.get('/location/getName', async (request, response) => {
    const { name } = request.query
  
    try {
      const movements = await Movement.findAll({
        include: [
          { model: Location, as: 'origin', where: { name } },
          { model: Location, as: 'destination', where: { name } }
        ],
        include: MovementItem
      })
  
      response.json(movements)
    } catch (error) {
      response.status(500).json({ error: 'Failed to fetch movements' })
    }
  })
  
  // Rota para obter todas as movement items de um Movement
  routes.get('/:id/getAllMoviment', async (request, response) => {
    const { id } = request.params
  
    try {
      const movement = await Movement.findByPk(id, {
        include: MovementItem
      })
  
      if (!movement) {
        return response.status(404).json({ error: 'Movement not found' })
      }
  
      const movementItems = movement.MovementItems
  
      response.json(movementItems)
    } catch (error) {
      response.status(500).json({ error: 'Failed to fetch movement items' })
    }
  })
  
  export default routes