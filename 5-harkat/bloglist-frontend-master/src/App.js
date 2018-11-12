import React from 'react'
import Blog from './components/Blog'
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
      user: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }

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

    const newBlog = await blogService.create(blogObject)
    console.log('returned newBlog:',newBlog)

    console.log('update set state')
    this.setState({
      blogs: this.state.blogs.concat(newBlog),
      newtitle: '',
      newauthor: '',
      newurl: ''
    })

    /*
    blogService
      .create(noteObject)
      .then(newNote => {
        this.setState({
          notes: this.state.notes.concat(newNote),
          newNote: ''
        })
      })
      */
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
        error: 'käyttäjätunnus tai salasana virheellinen',
      })
      console.log('error in login', exception)
      setTimeout(() => {
        this.setState({ error: null })
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
    //this.setState({ newTitle: event.target.value })
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    if (this.state.user === null) {
    return (
      <div>

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
        <h2>blogs</h2>
        <p>{this.state.user.name} logged in <button onClick={this.logout}>logout</button></p>
        {this.state.blogs.map(blog => 
          <Blog key={blog._id} blog={blog}/>
        )}

        
      <h2>create new</h2>

      <form onSubmit={this.addBlog}>
        Title:<input
          type="text"
          name="newtitle"
          value={this.state.newTitle}
          onChange={this.handleBlogChange}
        />
        <br/>
        Author:<input
          type="text"
          name="newauthor"
          value={this.state.newAuthor}
          onChange={this.handleBlogChange}
        />
        <br/>
        Url:<input
          type="text"
          name="newurl"
          value={this.state.newUrl}
          onChange={this.handleBlogChange}
        />
        <button type="submit">tallenna</button>
      </form>

      </div>
    );
  }
}

export default App;
