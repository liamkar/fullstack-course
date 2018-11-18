import React from 'react'
//import { shallow } from 'enzyme'
//import Note from './Note'

const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

const counterReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GOOD':
        console.log(state.good)
        return { ...state, good: state.good+1 }
        return Object.assign(state,{good: state.good+1})
      case 'OK':
        //return Object.assign(state,{ok: state.ok+1})
        return { ...state, ok: state.ok+1 }
      case 'BAD':
        //return Object.assign(state,{bad: state.bad+1})
        return { ...state, bad: state.bad+1 }
      case 'NOLLAA':
        console.log('returning state with zero values in all')
        return initialState
      default:
        return initialState

    }
    //return state
  }

  export default counterReducer