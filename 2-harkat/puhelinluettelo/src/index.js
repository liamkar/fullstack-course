
import ReactDOM from 'react-dom'
import React from 'react'
import App from './App'

/*
this.state = {
  persons: [
    { name: 'Arto Hellas' }
  ],
  newName: ''
}
*/

const persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    phoneNumber: '+358-44556677',
    date: '2017-12-10T17:30:31.098Z',
    important: true
  }
]


/*
const notes = [
  {
    id: 1,
    content: 'Arto Hellas',
    date: '2017-12-10T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Selain pystyy suorittamaan vain javascriptiä',
    date: '2017-12-10T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'HTTP-protokollan tärkeimmät metodit ovat GET ja POST',
    date: '2017-12-10T19:20:14.298Z',
    important: true
  }
]
*/

ReactDOM.render(
  <App persons={persons} />,
  document.getElementById('root')
)
