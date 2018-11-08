const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


//better to refa this to the user.js
//at least one rational thing to do this, is to hide the password...
const formatUser = (user) => {
    return {
      id: user.id,
      username: user.username,
      name: user.name,
      adult: user.adult
      //notes: user.notes
    }
  }


usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      adult: body.adult,
      passwordHash
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})


  usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users.map(formatUser))
  })


module.exports = usersRouter