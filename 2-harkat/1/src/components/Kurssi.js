import React from 'react'

const Kurssi = (props) => {
    console.log(props.kurssi);
  
  
    return (
      <div>
        <Otsikko nimi={props.kurssi.nimi} />
        <Sisalto osat={props.kurssi.osat}  />
        <Yhteensa osat={props.kurssi.osat}  />
      </div>
    )
  }

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

export default Kurssi