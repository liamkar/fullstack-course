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

  likeBlog = async (event) => {
    event.preventDefault()

    console.log('id of the blog being UPDATED:',this.props.blog._id)
    console.log('user id at likeBlog',this.props.blog.user._id)

    //propsien arvoja ei voi päivittää, joten kopioidaan tiedotu ns. uuteen blogiin.
    const blogObject = {
      title: this.props.blog.title,
      author: this.props.blog.author,
      url: this.props.blog.url,
      user: this.props.blog.user._id,
      votes: this.props.blog.votes + 1
    }
    
    console.log('updating blogObject:',blogObject)

    try {
      const updatedBlog = await this.props.blogService.update(this.props.blog._id,blogObject)
      console.log('returned updatedBlog:',updatedBlog)

      //STATE OF THE PARENT MUST BE UPDATED USING HANDLERS PASSED AS PROPS TO THE CHILD.
      this.props.likeBlog(updatedBlog.votes, updatedBlog._id)

      /*
    this.setState({
      message: 'blog' +updatedBlog.title + ' was liked succesfully',
      messagetype: 'info'
    })
    
    setTimeout(() => {
      this.setState({ message: null, messagetype: null })
    }, 5000)
  */

    console.log('reached THE END OF UPDATE')

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
            {this.props.blog.votes} <button onClick={this.likeBlog}>like</button><br/>
            
            added by {this.props.blog.user.name} {this.props.blog.user.username}
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