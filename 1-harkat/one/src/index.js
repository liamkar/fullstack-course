import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
    return (
        <h1>{props.nimi}</h1>
    )
  }

  const Sisalto = (props) => {
    return (
      <div>
        <Osa osa={props.osa} tehtavat={props.tehtava}/>
        <Osa osa={props.osa2} tehtavat={props.tehtava2}/>
        <Osa osa={props.osa3} tehtavat={props.tehtava3}/>
      </div>
    )

  }

  const Osa = (props) => {
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

      <Sisalto osa={osa1} tehtava={tehtavia1} osa2={osa2} tehtava2={tehtavia2} osa3={osa3} tehtava3={tehtavia3}/>
      <Yhteensa tehtavia1={tehtavia1} tehtavia2={tehtavia2} tehtavia3={tehtavia3}/>
      
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)