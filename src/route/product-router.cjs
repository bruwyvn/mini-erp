const express = require('express')
const middleware = require('../middleware.cjs')
const Product = require('../model/product.cjs')

const productRouter = express.Router()

productRouter.get('/', async (_request, response) => {
  const products = await Product.findAll()
  response.json(products)
})

productRouter.get('/:sku', async ({ params }, response) => {
  const product = await Product.findOne({ where: { sku: params.sku } })
  response.json(product)
})

productRouter.post('/', middleware, async (request, response) => {
  const product = await Product.create(request.body)
  response.json(product)
})

productRouter.put('/:sku', middleware, async ({ params }, response) => {
  const product = await Product.findOne({
    where: {
      sku: params.sku
    }
  })
  if (product) {
    await product.update(request.body)
    response.json(product)
  } else {
    response.status(404).json({ message: 'Product not found' })
  }
})

productRouter.delete('/:sku', middleware, async ({ params }, response) => {
  const product = await Product.findOne({
    where: {
      sku: params.sku
    }
  })
  if (product) {
    await product.destroy()
    response.json({ message: 'Product deleted' })
  } else {
    response.status(404).json({ message: 'Product not found' })
  }
})

module.exports = productRouter
