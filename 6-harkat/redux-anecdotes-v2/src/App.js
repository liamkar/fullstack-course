import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import { connect } from 'react-redux'
import { anecdoteInitialization } from './reducers/anecdoteReducer'
//import anecdoteService from './services/anecdotes'


class App extends React.Component {
  componentDidMount = async () => {
    /*
    const anecdotes = await anecdoteService.getAll()
    console.log('anecdotes found from jsonserver:',anecdotes)
    this.props.anecdoteInitialization(anecdotes)
    */
    this.props.anecdoteInitialization()
  }

  render() {
    //const anecdotes = this.props.store.getState()
    return (
      <div>
        <h1>Programming anecdotes</h1>
        <Notification  />
        <Filter  />
        <AnecdoteList  />
        <AnecdoteForm  />
      </div>
    )
  }
}

//export default App

export default connect(
  null,
  { anecdoteInitialization }
)(App)