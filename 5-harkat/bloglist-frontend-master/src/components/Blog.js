import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
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
        <p onClick={this.toggleVisibility}>
        {this.props.blog.title} {this.props.blog.author}
        </p>
        <p style={showWhenVisible}>{this.props.blog.url}<br/>
            {this.props.blog.votes} <button onClick={this.onLike}>like</button><br/>
            
            added by {this.props.blog.user.name} {this.props.blog.user.username}<br/>
            <button style={deleteButtonStyle} onClick={this.onDelete}>delete</button>
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