import userService from '../services/users'
//import { notifyWith } from './../reducers/notificationReducer'

//const users = {users:[], }
const usersReducer = (state = [], action) => {
  console.log('ACTION: ', action)
  switch (action.type) {

  case 'INIT_USERS':
    return action.data
  default:
    return state
  }
}

export const initializeUsers = () => {
  return async (dispatch) => {
    const blogs = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: blogs
    })
  }
}

export default usersReducer