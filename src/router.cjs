const express = require('express')
const middleware = require('./middleware.cjs')

const Inventory = require('./model/inventory.cjs')

const loginRouter = require('./route/login-router.cjs')
const productRouter = require('./route/product-router.cjs')
const inventoryRouter = require('./route/inventory-router.cjs')

const router = express.Router()

router.use('/login', loginRouter)
router.use('/products', productRouter)
router.use('/inventories', inventoryRouter)

router.get('/protected', middleware, async ({ user }, response) => {
  const hasPermission = user.Roles.some((role) =>
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

module.exports = router
