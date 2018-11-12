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

  render() {
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    return (
      <div style={blogStyle}>
        <p onClick={this.toggleVisibility}>
        {this.props.blog.title} {this.props.blog.author}
        </p>
        <p style={showWhenVisible}>{this.props.blog.url}<br/>
            {this.props.blog.votes} <button>like</button><br/>
            added by {this.props.blog.user.name} {this.props.blog.user.username}
            </p>
      </div>
    )
  }
}


/*
const Blog = ({blog}) => (
  <div>
    {blog.title} {blog.author}
  </div>  
)
*/


export default Blog