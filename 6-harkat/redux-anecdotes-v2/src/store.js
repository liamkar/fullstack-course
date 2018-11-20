
/*
import { createStore } from 'redux'
import reducer from './reducers/anecdoteReducer'

const store = createStore(reducer)

export default store

*/


import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

/*
const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer
})
*/

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    filter: filterReducer
  })


const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store