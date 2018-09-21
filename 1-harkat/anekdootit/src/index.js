import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      anecdoteVotes: [ 0, 0, 0, 0, 0, 0 ] //good to place this info to state as state changes can be rendered automatically.?
    }
  }

  arvoAnekdootti = () => {
    return () => {
      this.setState({ selected: Math.floor(Math.random() * anecdotes.length) })
    }
  }

  voteAnekdootti = () => {
    return () => {
        const kopio = [...this.state.anecdoteVotes]
        kopio[this.state.selected] += 1
        this.setState({ anecdoteVotes: kopio })
    }
  }

  render() {
    return (

      <div>
        {this.props.anecdotes[this.state.selected]}
        <br></br>
        has {this.state.anecdoteVotes[this.state.selected]} votes
        <br></br>

        <Button
                    handleClick={this.voteAnekdootti()}
                    text="vote"
                />
        <Button
                    handleClick={this.arvoAnekdootti()}
                    text="next anecdote"
                />

        <br></br>
        <b>Anecdote with most votes</b><br></br>
        {this.props.anecdotes[this.state.anecdoteVotes.indexOf(Math.max(...this.state.anecdoteVotes))]}
        <br/>
        has {Math.max(...this.state.anecdoteVotes)} votes
      </div>
    )
  }
}


const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )


ReactDOM.render(
  <App anecdotes={anecdotes}/>,
  document.getElementById('root')
)
