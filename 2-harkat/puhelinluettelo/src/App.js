import React from 'react'
import Note from './components/Note'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: props.persons,
      newName: '',
      showAll: true
    }
  }

  toggleVisible = () => {
    this.setState({ showAll: !this.state.showAll })
  }

  addPhoneNumber = (event) => {
    event.preventDefault()
    const phoneNumberObject = {
      name: this.state.newName,
      date: new Date().new,
      important: Math.random() > 0.5,
      id: this.state.persons.length + 1
    }

    const persons = this.state.persons.concat(phoneNumberObject)

    this.setState({
      persons,
      newName: ''
    })
  }

  handleNameChange = (event) => {
    console.log(event.target.value)
    this.setState({ newName: event.target.value })
  }

  render() {
    const phoneNumbersToShow =
      this.state.showAll ?
        this.state.persons :
        this.state.persons.filter(person => person.important === true)

    const label = this.state.showAll ? 'vain tärkeät' : 'kaikki'

    return (
              <div>
                <h2>Puhelinluettelo</h2>
                <form onSubmit={this.addPhoneNumber}>
                  <div>
                    nimi: 
                    <input 
                        value={this.state.newName} 
                        onChange={this.handleNameChange}
                    />

                  </div>
                  <div>
                    <button type="submit">lisää</button>
                  </div>
                </form>
                <h2>Numerot</h2>
                <ul>
                    {phoneNumbersToShow.map(person => <Note key={person.id} person={person} />)}
                </ul>
              </div>
            )
  }
}

export default App