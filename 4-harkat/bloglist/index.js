const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')

mongoose
  .connect(config.mongoUrl)
  .then( () => {
    console.log('connected to database', config.mongoUrl)
  })
  .catch( err => {
    console.log(err)
  })

app.use(cors())
app.use(bodyParser.json())

const blogsRouter = require('./controllers/blogs')
app.use('/api/blogs', blogsRouter)

const usersRouter = require('./controllers/users')
app.use('/api/users', usersRouter)

const loginRouter = require('./controllers/login')
app.use('/api/login', loginRouter)

/*
const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
*/

//Sovelluksen käynnistäminen tapahtuu nyt server-muuttujassa
//olevan olion kautta. Serverille määritellään 
//tapahtumankäsitteljäfunktio tapahtumalle close eli tilanteeseen,
//missä sovellus sammutetaan. Tapahtumankäsittelijä sulkee 
//tietokantayhteyden. Sekä sovellus app että sitä suorittava 
//server-olio määritellään eksportattavaksi tiedostosta. 
//Tämä mahdollistaa sen, että testit voivat käynnistää ja sammuttaa
// backendin.

const server = http.createServer(app)

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}