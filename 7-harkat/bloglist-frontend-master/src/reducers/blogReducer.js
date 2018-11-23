import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  console.log('ACTION: ', action)
  switch (action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
    /*
  case 'TOGGLE_IMPORTANCE': {
    const id = action.data.id
    const noteToChange = state.find(n => n.id === id)
    const changedNote = { ...noteToChange, important: !noteToChange.important }
    return state.map(note => note.id !== id ? note : changedNote )
  }
  */
  case 'DELETE_BLOG':
  //  const noteToChange = state.find(n => n.id === id)


/*
    myArray = myArray.filter(function( obj ) {
        return obj.field !== 'money';
    });
*/

/*
    myArray = myArray.filter(function( obj ) {
        return obj.field !== 'money';
    });
*/

    return state.filter(blog => blog._id !== action.id)


    //const changedNote = { ...noteToChange, important: !noteToChange.important }
    //return state.map(note => note.id !== id ? note : changedNote )
  case 'UPDATE_BLOG':
    console.log('UPDATE_BLOG:',action.data)
    const updated = action.data
    const id = updated._id
    console.log('UPDATE_BLOG:new votes value:',updated.votes)
    console.log('state blogs before update:',state)
    const updatedBlogs = state.map(b => b._id === id ? updated : b)
    console.log(updatedBlogs)
    return updatedBlogs

  case 'INIT_BLOGS':
    return action.data
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const deleteBlog = (blogId) => {
    console.log('deleteBlog at reducer')
    return async (dispatch) => {
        try {
            const deletedBlog = await blogService.remove(blogId)
            console.log('returned deletedBlog:',deletedBlog)
      
            //let's get all the blogs again after the delete and update state to hide the deleted and to sort the remaining blogs.
            /*
            const blogs = await blogService.getAll()
            dispatch({
                type: 'DELETE_BLOGS',
                data: blogs
              })    
            */

           dispatch({
            type: 'DELETE_BLOG',
            id: blogId
          })

            /*
            this.sortBlogs(blogs)
      
            this.setState({
              message: 'blog deleted succesfully',
              messagetype: 'info'
           })
      
           setTimeout(() => {
            this.setState({ message: null, messagetype: null })
          }, 5000)
      */
          console.log('reached THE END OF UPDATE')
        
      } catch(exception) {
          console.log('deleting of blog failed:',exception);
        }
      
    }
}

export const like = (blog) => {
    console.log('at the start of like ')
    return async (dispatch) => {

        console.log('like clicked at like reducer')
        const changedBlog = {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            //user: blog.user._id,
            user: blog.user,
            votes: blog.votes + 1
          }
    
          let blogId = blog._id

        console.log('updating blogObject:',changedBlog)

        //try {
            const updatedBlog = await blogService.update(blogId,changedBlog)
            console.log('returned updatedBlog:',updatedBlog)
            dispatch({
                type: 'UPDATE_BLOG',
                data: updatedBlog
              })

            /*
            let myIndex = 0

            console.log('just before iterator of all blogs')
            console.log(this.state.blogs)
            for (let stateBlog of this.state.blogs) {
            if (stateBlog._id === blogId) {
                break
            }
            myIndex++
            */

        /*
        } catch(exception) {
            console.log('updating of blog failed:',exception);  
        }
        */
    
        /*
        await noteService.createNew(note.id, changedNote)
        dispatch({
          type: 'TOGGLE_IMPORTANCE',
          data: { id: note.id },
        })
        */
      
    /*
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
    */
  }
}
  /*
  handleBlogLike = async (blog) => {
    //handleBlogLike = async (blogId) => {
  
   const blogObject = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    user: blog.user._id,
    votes: blog.votes + 1
  }
  
    
  let blogId = blog._id

    console.log('updating blogObject:',blogObject)

    try {
      const updatedBlog = await blogService.update(blogId,blogObject)
      console.log('returned updatedBlog:',updatedBlog)

    let myIndex = 0

    console.log('just before iterator of all blogs')
    console.log(this.state.blogs)
    for (let stateBlog of this.state.blogs) {
      if (stateBlog._id === blogId) {
        break
      }
      myIndex++
    }

    console.log('just before starting update STATE')

    //sitten pitäisi stateen päivittää tätä yhtä blogia tämän yhden kentän osalta...
    // 1. Make a shallow copy of the items
    let blogsCopy = [...this.state.blogs];
    // 2. Make a shallow copy of the item you want to mutate
    let blogCopy = { ...blogsCopy[myIndex] };
    // 3. Replace the property you're intested in
    //blogCopy.votes = newVotesValue;
    blogCopy.votes = updatedBlog.votes;
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    blogsCopy[myIndex] = blogCopy;
    // 5. Set the state to our new copy
    //this.setState({blogs});

    this.setState({
      blogs: blogsCopy
    });

    this.sortBlogs()
  
} catch(exception) {
  console.log('updating of blog failed:',exception);

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
*/
/*
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

export default blogReducer