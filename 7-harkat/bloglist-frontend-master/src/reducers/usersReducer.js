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
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export default usersReducer