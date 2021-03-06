import React from 'react'
import PropTypes from 'prop-types'

//const jwt = require('jsonwebtoken')

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
      //rightsToDelete: true
    }
  }

  static propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    likeBlog: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired,
  }

  toggleVisibility = () => {
    this.setState({visible: !this.state.visible})
  }

  //sort of a helper function to connect child components event to parent component's event handler
  //if this.props.blog would have been passed directly to the parent, many problems started to occur (or maybe it was due to something else?)
  //TODO:check, what is actually the correct way to handle this parameter passing from child to parent for parent's event handler?
  onLike = (e) => {
    
    e.preventDefault()
    console.log('on like at blog child component')
    //var blogId = this.props.blog._id; 
    let blogToBeLiked = this.props.blog
    //this.props.likeBlog(blogId);
    this.props.likeBlog(blogToBeLiked);
  }

  onDelete = (e) => {
    e.preventDefault()
    console.log('on delete at blog child component')
    if (window.confirm("Do you really want to delete this blog?")) { 
      var blogId = this.props.blog._id; 
      this.props.deleteBlog(blogId);
      //window.open("exit.html", "Thanks for Visiting!");
    }    
  }

  render() {


    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    console.log(this.props.blog.user)
    console.log(this.props.user)
    //const decodedToken = jwt.verify(this.props.user.token, process.env.SECRET)
    //const showWhenRightsToDelete = { display: ((!this.props.blog.user) || (this.props.blog.user._id === decodedToken.id)) ? '' : 'none' }
    //at first, idea was to check user rights based on user ids. Problem is that we don't have direct access for the logged in user id.
    //we could read it from the token, but that requires extra libraries to be used in here. Let's do that based on usernames - those should be unique anyway...
    const showWhenRightsToDelete = { display: ((!this.props.blog.user) || (this.props.blog.user.username === this.props.user.username)) ? '' : 'none' }

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const deleteButtonStyle = {
      color: 'blue'
    }

    return (
      <div style={blogStyle}>
        <p className="content" onClick={this.toggleVisibility}>
        {this.props.blog.title} {this.props.blog.author}
        </p>
        <p className="votes" style={showWhenVisible}>{this.props.blog.url}<br/>
            {this.props.blog.votes} <button onClick={this.onLike}>like</button><br/>
            
            added by {this.props.blog.user.name} {this.props.blog.user.username}<br/>
            <button style={Object.assign({}, showWhenRightsToDelete, deleteButtonStyle)} onClick={this.onDelete}>delete</button>
            </p>
      </div>
    )
  }
}

//original version of the BLOG.
/*
const Blog = ({blog}) => (
  <div>
    {blog.title} {blog.author}
  </div>  
)
*/


export default Blog