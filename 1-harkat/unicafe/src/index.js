import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component {
    constructor() {
      super()
      this.state = {
        hyva: 0,
        neutraali: 0,
        huono: 0
      }
    }
  
    asetaArvoon = (arvo) => () => this.setState({ counter: arvo })
    /*
    kasvataYhdella = () => {
      this.setState({ counter: this.state.counter + 1 })
    }
  
    nollaa = () => {
      this.setState({ counter: 0 })
    }
    */

   klikHyva = () => {
    this.setState({
      hyva: this.state.hyva + 1
    })
  }

  klikNeutraali = () => {
    this.setState({
      neutraali: this.state.neutraali + 1
    })
  }
  
  klikHuono = () => {
    this.setState({
      huono: this.state.huono + 1
    })
  }

    render() {
        return (
          <div>
            <div>anna palautetta</div>
            <div>
            
              <button onClick={this.klikHyva}>
                hyvä
              </button>
              <button onClick={this.klikNeutraali}>
                neutraali
              </button>
              <button onClick={this.klikHuono}>
                huono
              </button>
            </div>
                <div>statistiikka</div>
                <div>hyvä {this.state.hyva}</div>
                <div>neutraali {this.state.neutraali}</div>
                <div>huono {this.state.huono}</div>
            
          </div>
        )
      }
    }

    ReactDOM.render(
        <App />,
        document.getElementById('root')
      )

