import React from 'react'

import { anecdoteCreation } from './../reducers/anecdoteReducer'
import { notificationSetting } from './../reducers/notificationReducer'
import { notificationRemove } from './../reducers/notificationReducer'

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    this.props.store.dispatch(anecdoteCreation(content))

    this.props.store.dispatch(notificationSetting('New anecdote,'+ content +',added succesfully!'))

    setTimeout(() => {
      this.props.store.dispatch(notificationRemove())
    }, 5000)


    /*
    this.props.store.dispatch({ 
      type: 'CREATE', 
      content 
    })
    */
  
    e.target.anecdote.value = ''
  }
   render() {
     return (
       <div>
      <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button> 
        </form>
      </div>
     )
   }
}

export default AnecdoteForm
