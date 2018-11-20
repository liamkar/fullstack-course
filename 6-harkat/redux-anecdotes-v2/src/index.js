import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { Provider } from 'react-redux'
import store from './store'
//import store from './store'
/*
import { createStore, combineReducers } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
*/

//import anecdoteReducer, { anecdoteInitialization} from './reducers/anecdoteReducer'
//import { anecdoteInitialization } from './reducers/anecdoteReducer'
//import anecdoteService from './services/anecdotes.'

/*
anecdoteService.getAll().then(anecdotes =>
  store.dispatch(anecdoteInitialization(anecdotes))
)
*/


/*
const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer
})

const store = createStore(reducer)
*/


/*
const render = () => {
  ReactDOM.render(
    <App store={store} />,
    document.getElementById('root')
  )
}
*/

/*
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'))
*/

/*
render()
store.subscribe(render)
*/

/*
const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
  document.getElementById('root'))
}
*/

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

/*
render()
store.subscribe(render)
*/