import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import counterReducer from './reducer'

/*
  const counterReducer = (state = {good: 0, ok: 0, bad:0}, action) => {
    switch (action.type) {
      case 'GOOD':
        console.log(state.good)
        return Object.assign(state,{good: state.good+1})
      case 'OK':
        return Object.assign(state,{ok: state.ok+1})
      case 'BAD':
        return Object.assign(state,{bad: state.bad+1})
      case 'NOLLAA':
        console.log('returning state with zero values in all')
        return {good: 0, ok: 0, bad:0}
    }
    return state
  }
*/

const store = createStore(counterReducer)

const Statistiikka = (props) => {
  const state = store.getState()
  const palautteita = state.good + state.ok + state.bad;

  console.log('palautteita:',palautteita)
  console.log(props)

  if (palautteita === 0) {
    return (
      <div>
        <h2>stataistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{state.good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{state.ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{state.bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td></td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{(state.good/palautteita)*100}</td>
          </tr>
        </tbody>
      </table>

      <button onClick={props.action}>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  klik = (nappi) => () => {
    console.log(nappi)
    store.dispatch({type: nappi})
  }

  nollaa(event) {
    event.preventDefault();
    store.dispatch({type: 'NOLLAA'})
  }


  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka action={this.nollaa}/>
      </div>
    )
  }
}

const renderApp = () => {
    ReactDOM.render(<App />, document.getElementById('root'))
  }
  
renderApp()

store.subscribe(renderApp)

store.subscribe(() => {
  const storeNow = store.getState()
  console.log('stateNow:',storeNow)
})