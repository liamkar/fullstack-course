import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
    return (
        <h1>{props.nimi}</h1>
    )
  }
  const Sisalto = (props) => {
    return (
        <p>{props.osa} {props.tehtavat}</p>
    )
  }

  const Yhteensa = (props) => {
  
    return (
        <p>yhteensä {props.tehtavia1 + props.tehtavia2 + props.tehtavia3} tehtävää</p>
    )
  }




const App = () => {
  const kurssi = 'Half Stack -sovelluskehitys'
  const osa1 = 'Reactin perusteet'
  const tehtavia1 = 10
  const osa2 = 'Tiedonvälitys propseilla'
  const tehtavia2 = 7
  const osa3 = 'Komponenttien tila'
  const tehtavia3 = 14

  return (
    <div>
      <Otsikko nimi={kurssi} />
      <Sisalto osa={osa1} tehtava={tehtavia1}/>
      <Sisalto osa={osa2} tehtava={tehtavia2}/>
      <Sisalto osa={osa3} tehtava={tehtavia3}/>
      <Yhteensa tehtavia1={tehtavia1} tehtavia2={tehtavia2} tehtavia3={tehtavia3}/>
      
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)