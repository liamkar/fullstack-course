import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import CreateBlog from './components/CreateBlog'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      newtitle: '',
      newauthor: '',
      newurl: '',
      username: '',
      password: '',
      user: null,
      message: null,
      messagetype: null
    }
  }

  sortBlogs(blogs) {
    
    let blogsToBeSorted

    if (blogs) {
      blogsToBeSorted = blogs
    }
    else {
      blogsToBeSorted = [].concat(this.state.blogs)
    }
    
    console.log('SORT')
    //const blogsSorted = [].concat(this.state.blogs)
    const blogsSorted = blogsToBeSorted
    .sort((a, b) => a.votes < b.votes)

    this.setState({
      blogs: blogsSorted
    })

  }

  componentDidMount() {
    
    blogService.getAll().then(blogs =>
      //this.setState({ blogs }) 
      //this.setState( blogs ) 
      this.sortBlogs(blogs)
    )

    //if sort is done after the first blogs set state, sorting will not happen.
    //this.sortBlogs()

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }

    console.log('component did mount!')

  }
  
  addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: this.state.newtitle,
      author: this.state.newauthor,
      url: this.state.newurl
      //TODO:
      //date: new Date(),
      //important: Math.random() > 0.5
    }

    console.log('adding new blogObject:',blogObject)

    try {
    const newBlog = await blogService.create(blogObject)
    console.log('returned newBlog:',newBlog)

    console.log('update set state')
    this.setState({
      blogs: this.state.blogs.concat(newBlog),
      newtitle: '',
      newauthor: '',
      newurl: ''
    })

    this.sortBlogs()

    this.setState({
      message: 'new blog' +newBlog.title + ' by ' +newBlog.author +' added',
      messagetype: 'info'
    })
    
    setTimeout(() => {
      this.setState({ message: null, messagetype: null })
    }, 5000)

  
} catch(exception) {
    this.setState({
      message: 'error in adding new blog:'+exception,
      messagetype:'error'
      //notes: this.state.notes.filter(n => n.id !== id)
    })
    setTimeout(() => {
      this.setState({message: null, messagetype: null})
    }, 5000)
  }
  }

  login = async (event) => {
    event.preventDefault()
    console.log('at the start of login method')
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
  
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user})
      console.log('login code reached the end')

    } catch(exception) {
      this.setState({
        message: 'käyttäjätunnus tai salasana virheellinen',
        messagetype: 'error'
      })
      console.log('error in login', exception)
      setTimeout(() => {
        this.setState({ message: null })
      }, 5000)
    }
  }

  logout = async (event) => {
    window.localStorage.removeItem('loggedBlogappUser');
    //window.localStorage.clear()
    this.setState({ username: '', password: '', user: null})
    console.log('logout went seemingly ok.')
  }

/*
  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value })
  }

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value })
  }
*/
  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleBlogChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleBlogLike = async (blog) => {
    //handleBlogLike = async (blogId) => {


    //propsien arvoja ei voi päivittää, joten kopioidaan tiedotu ns. uuteen blogiin
    /*
    const blogObject = {
      title: this.props.blog.title,
      author: this.props.blog.author,
      url: this.props.blog.url,
      user: this.props.blog.user._id,
      votes: this.props.blog.votes + 1
    }
    */


  
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
//probably would not work as can't directly update parent's state values.
/*
  this.setState({
    message: 'error in liking a blog:'+exception,
    messagetype:'error'
    //notes: this.state.notes.filter(n => n.id !== id)
  })
  setTimeout(() => {
    this.setState({message: null, messagetype: null})
  }, 5000)
}
*/
}
  }

  //handleBlogDelete = async (event) => {
  handleBlogDelete = async (blogId) => {
    //event.preventDefault()

    console.log('id of the blog being DELETED:',blogId)
    //console.log('user id at likeBlog',blog.user._id)

    try {
      const deletedBlog = await blogService.remove(blogId)
      console.log('returned deletedBlog:',deletedBlog)

      //let's get all the blogs again after the delete and update state to hide the deleted and to sort the remaining blogs.
      const blogs = await blogService.getAll()
        
      this.sortBlogs(blogs)

      this.setState({
        message: 'blog deleted succesfully',
        messagetype: 'info'
     })

     setTimeout(() => {
      this.setState({ message: null, messagetype: null })
    }, 5000)

    console.log('reached THE END OF UPDATE')
  
} catch(exception) {
    console.log('updating of blog failed:',exception);
  }
  }
  



  render() {
    if (this.state.user === null) {
    return (
      <div>
        <Notification message={this.state.message} messagetype={this.state.messagetype}/>
        <h2>Kirjaudu</h2>

        <form onSubmit={this.login}>
          <div>
            käyttäjätunnus
          <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            salasana
          <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
        </div>
      );
      }
      return (
        <div>
          <Notification message={this.state.message} messagetype={this.state.messagetype}/>
        <h2>blogs</h2>
        <p>{this.state.user.name} logged in <button onClick={this.logout}>logout</button></p>
        {this.state.blogs.map(blog => 
          <Blog key={blog._id} blog={blog} blogService={blogService} likeBlog={this.handleBlogLike} deleteBlog={this.handleBlogDelete}/>
          
        )}
        
        <Togglable buttonLabel="create">
            <CreateBlog
              title={this.state.newtitle}
              author={this.state.newauthor}
              url={this.state.newurl}
              handleBlogChange={this.handleLoginFieldChange}
              handleSubmit={this.addBlog}
            />
        </Togglable>

      </div>
    );
  }
}

export default App;
