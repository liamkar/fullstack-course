import React from 'react';
import ReactDOM from 'react-dom';

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

  const Statistics = ({state}) => (
    <div>
        <Statistic text="keskiarvo" stat={(state.huono*-1 + state.hyva*1)/(state.huono + state.neutraali + state.hyva)}></Statistic>
        <Statistic text="positiivisia" stat={(state.hyva/(state.huono + state.neutraali + state.hyva))*100} ></Statistic>
    </div>
)

const Statistic = ({text, stat}) => (
  <div>{text} {stat}
  </div>
)


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
                <Button
                    handleClick={this.klikHyva}
                    text="Hyva"
                />

                <Button
                    handleClick={this.klikNeutraali}
                    text="Neutraali"
                />


                <Button
                    handleClick={this.klikHuono}
                    text="Huono"
                />


            </div>
                <div>statistiikka</div>
                <div>hyvä {this.state.hyva}</div>
                <div>neutraali {this.state.neutraali}</div>
                <div>huono {this.state.huono}</div>

                <div>keskiarvo 
                </div>
                <Statistics state={this.state}></Statistics>
                                    
     
            
          </div>
        )
      }
    }


  


    ReactDOM.render(
        <App />,
        document.getElementById('root')
      )

