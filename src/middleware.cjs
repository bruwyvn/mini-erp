const jwt = require('jsonwebtoken')
const config = require('./config.cjs')

const User = require('./model/user.cjs')

const middleware = async (request, response, next) => {
  const authHeader = request.headers.authorization
  if (!authHeader) {
    return response.status(401).json({ error: 'Authorization header required' })
  }
  const token = authHeader.split(' ')[1]
  try {
    const decodedToken = jwt.verify(token, config.SECRET_KEY)
    const user = await User.findByPk(decodedToken.uuid, {
      include: [{ model: Role, include: [Permission] }]
    })
    if (!user) {
      return response.status(401).json({ error: 'User not found' })
    }

    request.user = user
    next()
  } catch {
    return response.status(401).json({ error: 'Invalid token' })
  }
}

module.exports = middleware
