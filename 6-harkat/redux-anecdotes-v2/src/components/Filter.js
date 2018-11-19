import React from 'react'

/*
import { anecdoteVote } from './../reducers/anecdoteReducer'
import { notificationSetting } from './../reducers/notificationReducer'
import { notificationRemove } from './../reducers/notificationReducer'
*/

import { filterChange } from './../reducers/filterReducer'

class Filter extends React.Component {
    handleChange = (event) => {
      // input-kentän arvo muuttujassa event.target.value
      this.props.store.dispatch(filterChange(event.target.value))
    }
    render() {
      const style = {
        marginBottom: 10
      }
  
      return (
        <div style={style}>
          filter <input onChange={this.handleChange}/>
        </div>
      )
    }
  }

export default Filter