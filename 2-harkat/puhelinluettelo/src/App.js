import React from 'react'
import Note from './components/Note'
import Filter from './components/Filter'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: props.persons,
      newName: '',
      newPhoneNumber: '',
      showAll: true,
      filter: ''
    }
  }

  toggleVisible = () => {
    this.setState({ showAll: !this.state.showAll })
  }

  addPhoneNumber = (event) => {
    event.preventDefault()
    const phoneNumberObject = {
      name: this.state.newName,
      phoneNumber: this.state.newPhoneNumber,
      date: new Date().new,
      important: Math.random() > 0.5,
      id: this.state.persons.length + 1
    }

    let nameAlreadyInUse = this.state.persons.filter(obj => {
        return (obj.name === this.state.newName || obj.phoneNumber === this.state.newPhoneNumber)
      })

      console.log(nameAlreadyInUse);

    if (nameAlreadyInUse.length === 0) { 

        const persons = this.state.persons.concat(phoneNumberObject)

        this.setState({
            persons,
            newName: '', 
            newPhoneNumber: ''
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

  render() {

    console.log('filter at app render:',this.state.filter.length);
    
    
    const phoneNumbersToShow =
      this.state.filter.length <= 0 ?
        this.state.persons :
        this.state.persons.filter(person => ((person.name.toLowerCase().indexOf(this.state.filter.toLowerCase()) > -1) ||
         ((person.phoneNumber.toLowerCase().indexOf(this.state.filter.toLowerCase()) > -1))))

    return (
              <div>
                <h2>Puhelinluettelo</h2>
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
                    {phoneNumbersToShow.map(person => <Note key={person.id} person={person} />)}
                </ul>
              </div>
            )
  }
}

export default App