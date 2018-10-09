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
    var totaali = props.osat.reduce(function(prev, cur) {
      return prev + cur.tehtavia;
    }, 0);
    return (        
        <p>yhteensä {totaali}</p>
    )
  }
/*
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
        },
        {
          nimi: 'Redux',
          tehtavia: 7,
          id: 4
        }
      ]
    }
  
    return (
      <div>
        <Kurssi kurssi={kurssi} />
      </div>
    )
  }
*/

const App = () => {
  const kurssit = [
    {
      nimi: 'Half Stack -sovelluskehitys',
      id: 1,
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
    },
    {
      nimi: 'Node.js',
      id: 2,
      osat: [
        {
          nimi: 'Routing',
          tehtavia: 3,
          id: 1
        },
        {
          nimi: 'Middlewaret',
          tehtavia: 7,
          id: 2
        }
      ]
    }
  ]
  
  return (
    
    <div>
      <h1>Opetusohjelma</h1>
      {kurssit.map(kurssi=><Kurssi key={kurssi.id} kurssi={kurssi}/>)}
    </div>


  )
}



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

      <Yhteensa osat={props.kurssi.osat}  />

    </div>
  )
}



ReactDOM.render(
  <App />,
  document.getElementById('root')
)