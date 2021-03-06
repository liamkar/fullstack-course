import React from 'react'
import { connect } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { logout, refreshLogin } from './reducers/userReducer'
import Login from './components/Login'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'
import Notification from './components/Notification'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/Togglable'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Navbar, Nav, NavItem } from 'react-bootstrap'

/*
<h2>blogs</h2>
{this.state.blogs.map(blog => 
      <Blog key={blog._id} blog={blog} user={this.state.user} blogService={blogService} likeBlog={this.handleBlogLike} deleteBlog={this.handleBlogDelete}/>
    )}
*/

class App extends React.Component {
  /*
  constructor() {
    super()
    //is there any sense refactoring this to some reducer?
    //we don't need this if using router/links - 
    this "state" is basically read and stored from the browser url in case of using Router.
    this.state = {
      page: 'home'
    }
  }
  */

  componentWillMount() {
    this.props.initializeBlogs()
    this.props.initializeUsers()

    console.log('this.props.user:',this.props.user)
    console.log('this.props:',this.props.user)
    console.log('users initialized:',this.props.users)

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    console.log('loggedUserJSON:',loggedUserJSON)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      this.props.refreshLogin(user)
      /*
      this.setState({user})
      console.log('user set to APP state:',user)
      blogService.setToken(user.token)
      console.log('reached end of user logging:')
      */
    }


  }

  onLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser');
    this.props.logout()

    //window.localStorage.clear()
    //this.setState({ username: '', password: '', user: null})
    console.log('logout went seemingly ok.')
  }

/*
  const userById = (id) =>
  this.props.users.find(user => user.id === Number(id))
*/


/*
  userById = (id) => {
    return this.props.users.find(user => user.id === Number(id))
  }
*/

  //TODO:lisää render metodiin tieto userista. ks. vanha koodi alla.
  //TODO:pitää lisätä togglable-ominaisuus createblogiin.
  render() {
    console.log('APP RENDERED!!!!!!!!!!!!!!')
    console.log('this.props.loggedInUser:',this.props.loggedInUser)

    const userById = (id) =>
      this.props.users.find(u => u.id === id)
    

    const blogById = (id) =>
      this.props.blogs.find(b => b.id === id)
    

    if (this.props.loggedInUser === null) {
      return (
        <div>
          <Login/>
        </div>
      )
    }
    else {
    return (
      <div className="container">
        <Router>
          <div>
            <div>

              <Navbar inverse collapseOnSelect>
  <Navbar.Header>
    <Navbar.Brand>
      BLOGLIST
    </Navbar.Brand>
    <Navbar.Toggle />
  </Navbar.Header>
  <Navbar.Collapse>
    <Nav>
      <NavItem href="#">
              <Link to="/">home</Link> &nbsp;
              </NavItem>
      <NavItem href="#">
              <Link to="/blogs">blogs</Link> &nbsp;
              </NavItem>
              <NavItem href="#">
              <Link to="/users">users</Link>
              </NavItem>
              <NavItem>
              <p className="blogBlock">{this.props.loggedInUser.name} logged in <button onClick={this.onLogout}>logout</button></p> 
         
              </NavItem>
    </Nav>
  </Navbar.Collapse>
</Navbar>
            </div>
            <Notification />
            <Route exact path="/" render={() => <BlogList />} />
            <Togglable buttonLabel="create">
              <CreateBlog/>
            </Togglable>
            <Route exact path="/blogs" render={() => <BlogList />} />
            <Route exact path="/blogs/:id" render={({match}) =>
              <Blog blogId={match.params.id} />}
              />
            <Route exact path="/users" render={() => <UserList />} />
            <Route exact path="/users/:id" render={({match}) =>
              <User user={userById(match.params.id)} />}
              />
          </div>
        </Router>      
      </div>


      /*
      <div>
        <NoteForm />
        <VisibilityFilter />
        <NoteList />
      </div>
      */
    )
    }  
  }


}



const mapStateToProps = (state) => {
  console.log('mapStateToProps:',state)
  return {
    loggedInUser: state.loggedInUser.user,
    users: state.users,
    blogs: state.blogs
  }
}

export default connect(
  //null,
  mapStateToProps,
  { initializeBlogs, initializeUsers, logout, refreshLogin }
)(App)

/*
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
    console.log('loggedUserJSON:',loggedUserJSON)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      console.log('user set to APP state:',user)
      blogService.setToken(user.token)
      console.log('reached end of user logging:')
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

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleBlogChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

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
        <Notification />
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
          <Notification />
        <h2>blogs</h2>
        <p className="blogBlock">{this.state.user.name} logged in <button onClick={this.logout}>logout</button></p>
        {this.state.blogs.map(blog => 
          <Blog key={blog._id} blog={blog} user={this.state.user} blogService={blogService} likeBlog={this.handleBlogLike} deleteBlog={this.handleBlogDelete}/>
          
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
*/