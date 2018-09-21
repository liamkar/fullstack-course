import React from 'react';
import ReactDOM from 'react-dom';

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )



const Statistics = ({state}) => {
    if (state.huono + state.neutraali + state.hyva === 0) {
        return (
          <div>
            <em>ei yhtään palautetta annettu</em>
          </div>
        )
      }
      return (
        <div>
            <div>
            <em>Statistiikka</em>
          </div>
        <Statistic text="hyva" stat={state.hyva}></Statistic>
        <Statistic text="neutraali" stat={state.neutraali}></Statistic>
        <Statistic text="huono" stat={state.huono}></Statistic>
        <Statistic text="keskiarvo" stat={(state.huono*-1 + state.hyva*1)/(state.huono + state.neutraali + state.hyva)}></Statistic>
        <Statistic text="positiivisia" stat={(state.hyva/(state.huono + state.neutraali + state.hyva))*100} symbol="%" ></Statistic>
        </div>
      )
}
      
const Statistic = ({text, stat, symbol = ""}) => (
  <div>{text} {stat} {symbol}
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

   asetaPalaute = (palaute) => {
    return () => {
      this.setState({ hyva: this.state.hyva + palaute.hyva, neutraali: this.state.neutraali + palaute.neutraali, huono: this.state.huono + palaute.huono })
    }
  }

  alustaPalauteOlio = (laatu) => {
    console.log('laatu:'+laatu)
    const palaute = {
        hyva: 0,
        neutraali: 0,
        huono: 0
    }

    palaute[laatu] = 1

  return palaute;
}
    render() {
        return (            
          <div>
              
            <div>anna palautetta</div>
            <div>
                <Button
                    handleClick={this.asetaPalaute(                        
                        this.alustaPalauteOlio('hyva')
                      )}
                    text="Hyva"
                />

                <Button
                    handleClick={this.asetaPalaute(
                        this.alustaPalauteOlio('neutraali')
                      )}
                    text="Neutraali"
                />

                <Button
                    handleClick={this.asetaPalaute(
                        this.alustaPalauteOlio('huono')
                      )}
                    text="Huono"
                />

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

