const notificationReducer = (state = 'default notification message', action) => {
    switch (action.type) {
      case 'SET_NOTIFICATION':
        return action.message
      case 'REMOVE_NOTIFICATION':
        return ''
      default:
        return state
    }
  }


export const notificationSetting = (message) => {
    return {
      type: 'SET_NOTIFICATION',
      message
    }
  }

export const notificationRemove = () => {
    return {
      type: 'REMOVE_NOTIFICATION'
    }
  }




export default notificationReducer