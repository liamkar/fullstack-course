import React from 'react'

import { anecdoteVote } from './../reducers/anecdoteReducer'
import { notificationSetting } from './../reducers/notificationReducer'
import { notificationRemove } from './../reducers/notificationReducer'


class AnecdoteList extends React.Component {

  handleSubmit = (e) => {
    this.props.store.dispatch(anecdoteVote(e.id))
    this.props.store.dispatch(notificationSetting('One vote added for anecdote '+ e.content +'!'))

    setTimeout(() => {
      this.props.store.dispatch(notificationRemove())
    }, 5000)


    /*
    this.props.store.dispatch({ 
      type: 'CREATE', 
      content 
    })
    */
  
    //e.target.anecdote.value = ''
  }


  render() {
    const anecdotes = this.props.store.getState().anecdotes
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div name="name">
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() =>
                //this.props.store.dispatch({ type: 'VOTE', id: anecdote.id })
                //this.props.store.dispatch(anecdoteVote(anecdote.id))
                this.handleSubmit(anecdote)
              }>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default AnecdoteList
