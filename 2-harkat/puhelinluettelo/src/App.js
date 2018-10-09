import React from 'react'
import Note from './components/Note'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: props.notes,
      newNote: '',
      showAll: true
    }
  }

  toggleVisible = () => {
    this.setState({ showAll: !this.state.showAll })
  }

  addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: this.state.newNote,
      date: new Date().new,
      important: Math.random() > 0.5,
      id: this.state.notes.length + 1
    }

    const notes = this.state.notes.concat(noteObject)

    this.setState({
      notes,
      newNote: ''
    })
  }

  handleNoteChange = (event) => {
    console.log(event.target.value)
    this.setState({ newNote: event.target.value })
  }

  render() {
    const notesToShow =
      this.state.showAll ?
        this.state.notes :
        this.state.notes.filter(note => note.important === true)

    const label = this.state.showAll ? 'vain tärkeät' : 'kaikki'

    return (
              <div>
                <h2>Puhelinluettelo</h2>
                <form onSubmit={this.addNote}>
                  <div>
                    nimi: 
                    <input 
                        value={this.state.newNote} 
                        onChange={this.handleNoteChange}
                    />

                  </div>
                  <div>
                    <button type="submit">lisää</button>
                  </div>
                </form>
                <h2>Numerot</h2>
                <ul>
                    {notesToShow.map(note => <Note key={note.id} note={note} />)}
                </ul>
              </div>
            )
  }
}

export default App