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
      adult: user.adult,
      blogs: user.blogs
    }
  }

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    if (!body.password || body.password.length < 3) {
        return response.status(400).json({ error: 'password must be at least 3 characters long' })  
    }

    const existingUser = await User.find({username: body.username})
    if (existingUser.length>0) {
      return response.status(400).json({ error: 'username must be unique' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      adult: body.adult,
      passwordHash
    })

    if (user.adult === undefined) {
        user.adult = true
    }

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

  usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { author: 1, title: 1, votes:1, url:1, _id:1 })
    response.json(users.map(formatUser))
  })


module.exports = usersRouter