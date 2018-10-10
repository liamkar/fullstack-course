
import React from 'react'

const Note = ({ person }) => {
  return (
    <li>{person.name} {person.number}</li>
  )
}

export default Note