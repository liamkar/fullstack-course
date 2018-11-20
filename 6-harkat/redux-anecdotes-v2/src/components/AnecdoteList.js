import React from 'react'

import { anecdoteVote } from './../reducers/anecdoteReducer'
import { notificationSetting } from './../reducers/notificationReducer'
import { notificationRemove } from './../reducers/notificationReducer'

import { connect } from 'react-redux'

//import anecdoteService from '../services/anecdotes'

class AnecdoteList extends React.Component {

  handleSubmit = async (anecdote) => {
    //this.props.store.dispatch(anecdoteVote(e.id))
    //this.props.anecdoteVote(anecdote.id)

    //anecdoteService.update()
    /*
    anecdote.votes = anecdote.votes+1
    const updatedAnecdote = await anecdoteService.update(anecdote.id,anecdote)
    this.props.anecdoteVote(updatedAnecdote)
    */
   
    this.props.anecdoteVote(anecdote)

    //console.log('updatedAnecdote',updatedAnecdote)

    //this.props.store.dispatch(notificationSetting('One vote added for anecdote '+ e.content +'!'))
    this.props.notificationSetting('One vote added for anecdote '+ anecdote.content +'!')

    setTimeout(() => {
      //this.props.store.dispatch(notificationRemove())
      this.props.notificationRemove()
    }, 5000)
  }


  render() {

    /*
    const anecdotesToShow = () => {      
      //const { anecdotes, filter } = this.props.store.getState()
      const { anecdotes, filter } = this.props
      if (!filter) {
        return anecdotes
      }
      
      console.log('just before filtering the anecdotes')
      console.log('filter is',filter)
      const result = anecdotes.filter(anecdote => anecdote.content.includes(filter) )
      
      return result
    }
    */

    /*
    //if (this.props.anecdotesToShow === undefined) {
      if (this.props.visibleAnecdotes === undefined) {
      console.log('anecdotesToShow',this.props.anecdotesToShow)
      return (<div>
      <h2>Anecdotes</h2>
      </div>)
    }
    else {

      */
    return (
      <div>
        <h2>Anecdotes</h2>
        
        {this.props.visibleAnecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
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
        //    }
  }
}

//export default AnecdoteList

const anecdotesToShow = (anecdotes, filter) => {      
  //const { anecdotes, filter } = this.props.store.getState()
  //const { anecdotes, filter } = this.props
  console.log('anecdotes at the start of anecdotesToShow:',anecdotes)
  console.log('anecdotesToShow filter is ',filter)
  if (!filter) {
    return anecdotes
  }
  
  console.log('just before filtering the anecdotes')
  console.log('filter is',filter)
  const result = anecdotes.filter(anecdote => anecdote.content.includes(filter) )

  console.log('anecdotesToShow return results',result)
  return result
}


const mapStateToProps = (state) => {
  return {
    //anecdotes: state.anecdotes,
    //filter: state.filter
    visibleAnecdotes: anecdotesToShow(state.anecdotes, state.filter)
  }
}


const mapDispatchToProps = {
  anecdoteVote,
  notificationSetting,
  notificationRemove
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdoteList
