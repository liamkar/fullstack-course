import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import blogReducer from './reducers/blogReducer'
//import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

import userReducer from './reducers/userReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  loggedInUser: userReducer
})

//const reducer = 

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store