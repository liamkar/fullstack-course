import React from 'react'

const Note = ({ person, handlePersonRemove }) => {
  return (
    <li>{person.name} {person.number} <button onClick={handlePersonRemove}>poista</button></li>
  )
}

export default Note