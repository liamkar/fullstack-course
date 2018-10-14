import React, { Component } from 'react';
import axios from 'axios'
import Country from './components/Country'
import Filter from './components/Filter'


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: ''
    }
  }

  componentDidMount() {
    console.log('did mount')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ countries: response.data })
      })
  }


  handleFilterChange = (event) => {
    console.log(event.target.value)
    this.setState({ filter: event.target.value })
  }

  render() {

    let countriesToShow = [];

    const countriesFiltered =
      this.state.filter.length <= 0 ?
        this.state.countries :
        this.state.countries.filter(country => ((country.name.toLowerCase().indexOf(this.state.filter.toLowerCase()) > -1)))

    let errorMessage = ''

    //fields for single country view
    let countryHeader = ''
    let capital = ''
    let population = ''
    let flag = ''
    

    if (countriesFiltered.length === 1) {
      countryHeader = countriesFiltered[0].name + ' '+countriesFiltered[0].nativeName;
      capital = 'capital: '+ countriesFiltered[0].capital
      population = 'population: ' + countriesFiltered[0].population
      flag = countriesFiltered[0].flag
    }

    else if (countriesFiltered.length > 10) {
      errorMessage = 'too many matches, specify another filter' 
    }
    else {
      countriesToShow = countriesFiltered;
    }

    console.log(countriesFiltered);

    return (
      <div className="App">
        <header className="App-header"></header>          
        <div><Filter filter={this.state.filter} handleFilterChange={this.handleFilterChange} /></div>
        <div>{errorMessage}</div>
        
        {countriesFiltered.length === 1 &&
        <div>
        <h2>{countryHeader}</h2>
          <p>{capital}</p>
          <p>{population}</p>
          <img 
            src={flag} 
            alt="flag"
            height="100px"
            width="200px" />
            </div>
        }
        
          <ul>
            {countriesToShow.map(country => <li key={country.alpha2Code}>{country.name}</li>)}
          </ul>
      </div>
    );
  }
}

export default App;
