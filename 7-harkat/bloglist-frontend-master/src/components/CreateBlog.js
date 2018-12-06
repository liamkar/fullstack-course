import React from 'react'
import { connect } from 'react-redux'
import { addBlog } from './../reducers/blogReducer'
import { notify } from './../reducers/notificationReducer'


//-kurssin ohjeistus: "Reactin suosittelemaan tyyliin tila ja tilaa käsittelevät funktiot on kaikki
// määritelty komponentin ulkopuolella ja välitetään komponentille propseina.""
//const CreateBlog = ({handleSubmit, handleBlogChange, title, author, url}) => (

//...mutta entä jos tila liittyy oikeastaan vain komponenttiin...kuten tässä tapauksessa?
  class CreateBlog extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        title: '',
        author: '',
        url: ''
      }
    }

  handleBlogChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    }
    this.props.addBlog(blogObject)

    //can we get this notication to be fired at the addBlog method?
    //this.props.notify('NEW BLOG ADDED SUCCESFULLY',20000)
    this.props.notify('NEW BLOG ADDED SUCCESFULLY',5000)
    console.log('REACHED END OF HANDLESUBMIT of add new blog.')


    
    this.setState({
      title: '',
      url: '',
      author: '',
    })
  }

    render() {
      return (
    <div>
    <h2>create new</h2>

      <form onSubmit={this.handleSubmit}>
        Title:<input
          type="text"
          name="title"
          value={this.props.newtitle}
          onChange={this.handleBlogChange}
        />
        <br/>
        Author:<input
          type="text"
          name="author"
          value={this.props.author}
          onChange={this.handleBlogChange}
        />
        <br/>
        Url:<input
          type="text"
          name="url"
          value={this.props.url}
          onChange={this.handleBlogChange}
        />
        <button type="submit">tallenna</button>
      </form>
      </div>
      )
    }
  }

export default connect(
  null,
  { addBlog, notify }
)(CreateBlog)