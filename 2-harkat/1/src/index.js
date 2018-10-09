import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
  console.log('props at Otsikko:',props.nimi);
  
    return (
        <h1>{props.nimi}</h1>
    )
  }

  const Sisalto = (props) => {
    console.log(props.osat);
    //const { notes } = props.osat;
    //console.log(notes);
    return (
      <div>
          {props.osat.map(note=><Osa key={note.id} note={note}/>)}
      </div>
    )

  }

  const Osa = (note) => {
    console.log('at OSA, note:',note);
    console.log('note nimi:',note.note.nimi);
    console.log('note tehtavia:',note.tehtavia);
    return (
        <p>{note.note.nimi} {note.note.tehtavia}</p>
    )
  }

  
  const Yhteensa = (props) => {
  
    return (
        <p>yhteensä {props.osat[0].tehtavia + props.osat[1].tehtavia + props.osat[2].tehtavia} tehtävää</p>
    )
  }


  

  const App = () => {
    const kurssi = {
      nimi: 'Half Stack -sovelluskehitys',
      osat: [
        {
          nimi: 'Reactin perusteet',
          tehtavia: 10,
          id: 1
        },
        {
          nimi: 'Tiedonvälitys propseilla',
          tehtavia: 7,
          id: 2
        },
        {
          nimi: 'Komponenttien tila',
          tehtavia: 14,
          id: 3
        }
      ]
    }
  
    return (
      <div>
        <Kurssi kurssi={kurssi} />
      </div>
    )
  }


/*
const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14
      }
    ]
  }

  return (
    <div>
      <Otsikko nimi={kurssi.nimi} />

      <Sisalto osat={kurssi.osat}  />
      
    </div>
  )
}
*/

const Kurssi = (props) => {
  console.log(props.kurssi);

  /*
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14
      }
    ]
  }
  */

  return (
    <div>
      <Otsikko nimi={props.kurssi.nimi} />

      <Sisalto osat={props.kurssi.osat}  />
      
    </div>
  )
}



ReactDOM.render(
  <App />,
  document.getElementById('root')
)