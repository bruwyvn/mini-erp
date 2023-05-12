const config = require('./config.cjs')

const router = require(express).Router()

const loginRouter = router.post('/', async (request, response) => {
  const { email, password } = request.body // TODO: Use password hash instead of a plain one
  const user = await User.findOne({ where: { email } })
  if (!user) {
    return response.status(401).json({ error: 'Invalid email or password' })
  }

  // TODO: Decode password hash logic
  if (user.password !== password) {
    return response.status(401).json({ error: 'Invalid email or password' })
  }

  const token = jwt.sign({ uuid: user.uuid }, config.SECRET_KEY, {
    expiresIn: 1800
  })
  response.json({ token })
})

module.exports = loginRouter
