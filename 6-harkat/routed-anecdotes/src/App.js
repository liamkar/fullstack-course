import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'

import { Table } from 'react-bootstrap'
import { Grid,Row,Col } from 'react-bootstrap'

//material ui imports:
/*
import { List, ListItem, ListItemText, Button } from '@material-ui/core'
if (!List) console.error("List's import is wrong");
if (!ListItem) console.error("ListItem's import is wrong");
if (!ListItemText) console.error("ListItemText's import is wrong");
*/

const menuStyle = {
  backgroundColor: 'lightblue',
}

const menuNormalStyle = {
  backgroundColor: 'white'
}



const Menu = () => (
  <div style={menuStyle}>    
     <NavLink activeStyle={{backgroundColor:'grey'}} exact to="/">anecdotes</NavLink> &nbsp;
     <NavLink activeStyle={{backgroundColor:'grey'}} exact to="/create">create new</NavLink> &nbsp;
     <NavLink activeStyle={{backgroundColor:'grey'}} exact to="/about">about</NavLink>
  </div>
)

//could not get material ui list working in rational time, so commented out and rollback to safe choice:Bootstrap.
/*
const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
   <List>
      {anecdotes.map(anecdote => 
        <ListItem key={anecdote.id} component={Link} to={`/anecdotes/${anecdote.id}`}>
          <ListItemText primary={anecdote.content}/>
        </ListItem>
        )}
  </List>
  </div>
)
*/

/*
const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} >
        <Link to={`/anecdotes/${anecdote.id}`}>
          {anecdote.content}</Link></li>)}
    </ul>  
  </div>
)
*/

const AnecdoteList = ({anecdotes}) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped>
      <tbody>
        {anecdotes.map(anecdote=>
          <tr key={anecdotes.id}>
            <td>
              <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </td>
            
          </tr>
        )}
      </tbody>
    </Table>
  </div>
)



const Anecdote = ({anecdote}) => {
  return(
  <div>
    <h2>{anecdote.content}</h2>
    <div>{'has '+anecdote.votes+' votes'}</div>
    <div>{'for more info see '}<a href={anecdote.info}>{anecdote.info}</a></div>
  </div>
)}


const notificationStyle = {
  borderRadius: 25,
  borderColor: 'green',
  borderWidth: 4,
  borderStyle: 'solid'
}


const Notification = ({message}) => {
  if (message) {
    return(
      <div style={notificationStyle}>
        <p>{message}</p>
      </div>
    )
  }
  else {
    return(
      <div>
      </div>
    )
  }
}



const About = () => (
  <div>
    <h2>About anecdote app</h2>

    <Grid>
      <Row className="show-grid">
    <Col xs={12} md={8}>
    <p>According to Wikipedia:</p>
    
    <em>An anecdote is a brief, revealing account of an individual person or an incident. 
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
    </Col>
    
    <Col xs={6} md={4}>
    <img src="http://developeronfire.com/assets/images/UncleBobMartin.jpg"></img>
    </Col>
    </Row>
    </Grid>
  </div>
)

/*
const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>
    
    <em>An anecdote is a brief, revealing account of an individual person or an incident. 
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
    <img src="http://developeronfire.com/assets/images/UncleBobMartin.jpg"></img>
  </div>
)
*/

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    
    this.props.history.push('/')
  }

  render() {
    return(
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            content 
            <input name='content' value={this.state.content} onChange={this.handleChange} />
          </div>
          <div>
            author
            <input name='author' value={this.state.author} onChange={this.handleChange} />
          </div>
          <div>
            url for more info
            <input name='info' value={this.state.info} onChange={this.handleChange} />
          </div> 
          <button>create</button>
        </form>
      </div>  
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
    this.setState({notification: 'a new anecdote '+anecdote.content+' created!'})

    setTimeout(() => {
      this.setState({notification: null})
    }, 10000)
    
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    return (
      <div className="container">
        <h1>Software anecdotes</h1>
        <Router>
        <div>
          <Menu />
          <Notification message={this.state.notification} />
          <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes}/>} />
          <Route path="/about" render={() => <About />} />
          <Route path="/create" render={({history}) => <CreateNew history={history} addNew={this.addNew} />} />
          <Route exact path="/anecdotes/:id" render={({match}) => <Anecdote anecdote={this.anecdoteById(match.params.id)} />}/>
          </div>
        </Router>

        <Footer />
      </div>
    );
  }
}

export default App;
