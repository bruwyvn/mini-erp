const express = require('express')
const Inventory = require('../model/inventory.cjs')

const inventoryRouter = express.Router()

inventoryRouter.get('/', async (_request, response) => {
  const inventories = await Inventory.findAll()
  response.json(inventories)
})

inventoryRouter.get('/:name', async ({ params }, response) => {
  const inventory = await Inventory.findOne({
    where: { name: params.name }
  })
  response.json(inventory)
})

module.exports = inventoryRouter
