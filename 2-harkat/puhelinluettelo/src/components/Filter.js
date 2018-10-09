
import React from 'react'


const Filter = ({ filter, handleFilterChange }) => {

  return (
    <div>
                    rajaa näytettävä: 
                    <input 
                        value={filter} 
                        onChange={handleFilterChange}
                    />
                  </div>

  )
}

export default Filter