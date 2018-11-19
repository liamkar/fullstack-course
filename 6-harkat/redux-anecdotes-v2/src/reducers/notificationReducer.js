const notificationReducer = (state = 'default notification message', action) => {
    switch (action.type) {
      case 'SET_NOTIFICATION':
        return action.message
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


export default notificationReducer