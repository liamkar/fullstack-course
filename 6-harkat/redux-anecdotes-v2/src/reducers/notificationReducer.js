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

/*
  export const anecdoteVote = (anecdote) => {
    return async (dispatch) => {
      anecdote.votes = anecdote.votes+1
      const updatedAnecdote = await anecdoteService.update(anecdote.id,anecdote)
  
      //const newAnecdote = await anecdoteService.createNew(content)
      dispatch({
        type: 'VOTE',
        anecdote: updatedAnecdote
      })
    }
  }
*/

/*
export const notificationSetting = (message) => {

    return {
      type: 'SET_NOTIFICATION',
      message
    }
  }
*/

export const notificationSetting = (message, seconds) => {
    return async (dispatch) => {    
        setTimeout(() => {
            //this.props.store.dispatch(notificationRemove())
            //this.props.notificationRemove()
            console.log('timeout happened in notificationSetting')
            dispatch(notificationRemove())
        }, seconds*100)

        //const newAnecdote = await anecdoteService.createNew(content)
        dispatch({
          type: 'SET_NOTIFICATION',
          message
        })
      }
  }


export const notificationRemove = () => {
    return {
      type: 'REMOVE_NOTIFICATION'
    }
  }




export default notificationReducer