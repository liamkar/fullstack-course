//import blogService from '../services/blogs'

const notificationReducer = (state = '', action) => {
  console.log('ACTION: ', action)
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.notification
    /*
  case 'CLEAR_NOTIFICATION':
    return ''
    */
  default:
    return state
  }
}


export const filterChange = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    notification
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