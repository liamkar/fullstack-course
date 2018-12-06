//import blogService from '../services/blogs'

const notificationReducer = (state = '', action) => {
  console.log('ACTION: ', action)
  switch (action.type) {
  case 'NOTIFY':
    return action.message
  case 'CLEAR':
    return ''
  default:
    return state
  }
}

/*
export const filterChange = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    notification
  }
}
*/

export const notifyWith = (message, type, dispatch) => {
  dispatch({
    type: 'NOTIFY',
    content: {
      message, type
    }
  })
  setTimeout(() => {
    dispatch({
      type: 'CLEAR'
    })
  }, 5000)
}

export const notify = (message, time) => {
  return async (dispatch) => {
    console.log('DISPATCHING NOTIFICATION')
    dispatch({
      type: 'NOTIFY',
      message
    })
    
    setTimeout(() => {
      this.setState({ position: 1 });
    }, 3000);

    /*
    setTimeout(() => {
      console.log('DISPATCHING NOTIFICATION TIMEOUT')
      dispatch({
        type: 'CLEAR',
        message
      }, 50000)
    })
    */
  
  }
}



/*
export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}
*/

/*
export const createNew = (content) => {
  return async (dispatch) => {
    const newNote = await noteService.createNew(content)
    dispatch({
      type: 'NEW_NOTE',
      data: newNote
    })
  }
}

export const toggleImportance = (note) => {
  return async (dispatch) => {
    const changedNote = {
      content: note.content,
      importance: !note.importance
    }

    await noteService.createNew(note.id, changedNote)
    dispatch({
      type: 'TOGGLE_IMPORTANCE',
      data: { id: note.id },
    })
  }
}
*/

export default notificationReducer