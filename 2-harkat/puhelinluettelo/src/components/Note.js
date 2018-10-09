
import React from 'react'

const Note = ({ person }) => {
  return (
    <li>{person.name} {person.phoneNumber}</li>
  )
}

export default Note