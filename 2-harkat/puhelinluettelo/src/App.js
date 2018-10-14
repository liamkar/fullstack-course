import React from 'react'
//import axios from 'axios'
import Note from './components/Note'
import Filter from './components/Filter'
import personService from './services/persons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newPhoneNumber: '',
      showAll: true,
      filter: ''
    }
  }

componentDidMount() {
  console.log('did mount')

  personService
  .getAll()
  .then(persons => {
    this.setState({persons: persons})
  })
}

  toggleVisible = () => {
    this.setState({ showAll: !this.state.showAll })
  }

  addPhoneNumber = (event) => {
    event.preventDefault()
    const phoneNumberObject = {
      name: this.state.newName,
      number: this.state.newPhoneNumber,
      date: new Date().new,
      important: Math.random() > 0.5
      //our dummy server seems to be able to create id automatically...
      //id: this.state.persons.length + 1
    }

    let nameAlreadyInUse = this.state.persons.filter(obj => {
        return (obj.name === this.state.newName || obj.number === this.state.newPhoneNumber)
      })

      console.log(nameAlreadyInUse);

    if (nameAlreadyInUse.length === 0) { 

        personService
        .create(phoneNumberObject)
        .then(persons => {
          console.log('post was a success, next update state')      
          this.setState({
            persons: this.state.persons.concat(persons),
            newName: '',
            newPhoneNumber: ''
          })
        })
    }
    else {
        alert('Name or phone number is already in use!');
    }
  }

  handleFilterChange = (event) => {
    console.log(event.target.value)
    this.setState({ filter: event.target.value })
  }


  handleNameChange = (event) => {
    console.log(event.target.value)
    this.setState({ newName: event.target.value })
  }


  handlePhoneNumberChange = (event) => {
    console.log(event.target.value)
    this.setState({ newPhoneNumber: event.target.value })
  }

removePhoneNumber = (id) => {
  return () => {
    //const url = `http://localhost:3001/persons/${id}`

    personService
    .remove(id)      
      .then(whatever => {
        const persons = this.state.persons.filter(n => n.id !== id)
        this.setState({
          persons: persons,
          newName: '',
          newPhoneNumber: ''
        })
      })  }
}


  render() {

    console.log('filter at app render:',this.state.filter.length);
    
    
    const phoneNumbersToShow =
      this.state.filter.length <= 0 ?
        this.state.persons :
        this.state.persons.filter(person => ((person.name.toLowerCase().indexOf(this.state.filter.toLowerCase()) > -1) ||
         ((person.number.toLowerCase().indexOf(this.state.filter.toLowerCase()) > -1))))

    return (
              <div>
                <h2>Puhelinluettelo tete</h2>
                <div>

                    <Filter filter={this.state.filter} handleFilterChange={this.handleFilterChange} />

                  </div>
                <h2>Lisää uusi</h2>
                <form onSubmit={this.addPhoneNumber}>
                  <div>
                    nimi: 
                    <input 
                        value={this.state.newName} 
                        onChange={this.handleNameChange}
                    />

                    puhelinnumero: 
                    <input 
                        value={this.state.newPhoneNumber} 
                        onChange={this.handlePhoneNumberChange}
                    />

                  </div>
                  <div>
                    <button type="submit">lisää</button>
                  </div>
                </form>
                <h2>Numerot</h2>
                <ul>
                    {phoneNumbersToShow.map(person => <Note key={person.id} person={person} handlePersonRemove={this.removePhoneNumber(person.id)} />)}
                </ul>
              </div>
            )
  }
}

export default App