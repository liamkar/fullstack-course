import blogService from '../services/blogs'
import loginService from '../services/login'

const user = {user: null, name:'', password:''}

const userReducer = (state = user, action) => {
  console.log('ACTION: ', action)
  switch (action.type) {
  case 'UPDATE_NAME':
    let clone = Object.assign({}, state)
    console.log('at update name:'+action.data)
    clone.name= action.data
    console.log(clone)
    return clone
  case 'UPDATE_PASSWORD':
    clone = Object.assign({}, state)
    clone.password= action.data
    console.log('at update password:'+action.data)
    console.log(clone)
    return clone  
  case 'LOGIN':
    clone = Object.assign({}, state)
    clone.password= ''
    clone.name='',
    clone.user=action.data 
    return clone  
    /*
  case 'DELETE_BLOG':
    return state.filter(blog => blog._id !== action.id)
  case 'UPDATE_BLOG':
    console.log('UPDATE_BLOG:',action.data)
    const updated = action.data
    const id = updated._id
    console.log('UPDATE_BLOG:new votes value:',updated.votes)
    console.log('state blogs before update:',state)
    const updatedBlogs = state.map(b => b._id === id ? updated : b)
    console.log(updatedBlogs)
    return updatedBlogs
*/
    //be careful not to name switch cases with same names aomng different combined reducers
    //-->can lead to pretty nasty bugs:D
  //case 'INIT_BLOGS':
    //return action.data
  default:
    return state
  }
}

/*
export const updateName = () => {
    return async (dispatch) => {
      const blogs = await blogService.getAll()
      dispatch({
        type: 'INIT_BLOGS',
        data: blogs
      })
    }
  }
*/


export const updateName = (name) => {
    return {
        type: 'UPDATE_NAME',
        name
      }
  }

 export const updatePassword = (password) => {
    return {
        type: 'UPDATE_PASSWORD',
        password
      }
  }


/*
  export const noteCreation = (content) => {
    return {
      type: 'NEW_NOTE',
      data: {
        content,
        important: false,
        id: generateId()
      }
    }
  }
*/


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


export const deleteBlog = (blogId) => {
    console.log('deleteBlog at reducer')
    return async (dispatch) => {
        try {
            const deletedBlog = await blogService.remove(blogId)
            console.log('returned deletedBlog:',deletedBlog)
      

           dispatch({
            type: 'DELETE_BLOG',
            id: blogId
          })

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

      
  }
}
*/


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


//login = async (event) => {
export const login = (name, password) => {
  return async (dispatch) => {
    //it's probably better to keep event inside the component and not bring this to reducer
    //event.preventDefault()
    console.log('at the start of login method')
    //console.log(userReducer({type:'default'}))
    console.log(name)
    console.log(password)
    try{
      const loginUser = await loginService.login({
        //username: this.state.username,
        //password: this.state.password
        //username: user.name,
        //password: user.password
        username: name,
        password: password
      })
  
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(loginUser))
      blogService.setToken(loginUser.token)
      //this.setState({ username: '', password: '', user})
      console.log('user logged in:',loginUser)
      dispatch({
        type: 'LOGIN',
        //type: 'INIT_BLOGS',
        data: loginUser
      })

      console.log('login code reached the end')

    } catch(exception) {
      /*
      this.setState({
        message: 'käyttäjätunnus tai salasana virheellinen',
        messagetype: 'error'
      })
      console.log('error in login', exception)
      setTimeout(() => {
        this.setState({ message: null })
      }, 5000)
    }
    */
    console.log('error in login', exception)
  }
  }
}


//note probably not good idea to get event here as parameter - handle that inside component
//see example with-login method here. refa when all the time in the world.
export const handleLoginFieldChange = (event) => {
  return async (dispatch) => {
    event.preventDefault()
    //const blogs = await blogService.getAll()
    console.log('UPDATE_'+event.target.name)
    dispatch({
      type: 'UPDATE_'+event.target.name,
      data: event.target.value
    })
  }
}


/*
  logout = async (event) => {
    window.localStorage.removeItem('loggedBlogappUser');
    //window.localStorage.clear()
    this.setState({ username: '', password: '', user: null})
    console.log('logout went seemingly ok.')
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleBlogChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

*/


 
export default userReducer