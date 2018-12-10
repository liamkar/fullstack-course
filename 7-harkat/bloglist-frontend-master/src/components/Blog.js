import React from 'react'
import { connect } from 'react-redux'
import { like } from './../reducers/blogReducer'
/*
const userStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  //border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}
*/

class Blog extends React.Component {
  /*
  constructor(props) {
    super(props)
    this.state = {
      //extent of visibility of each blog is defined here. 
      //because of the need for this attribute, Blog was created as class Component.
      visible: false
    }
  }
  */


  toggleVisibility = () => {
    this.setState({visible: !this.state.visible})
  }


render() {

    //const showWhenVisible = { display: this.state.visible ? '' : 'none' }
    //const { user, handleClick } = this.props
    console.log('this.props at Blogs.js',this.props)
    //console.log('this.props at Blogs.js',this.props.blogs)
    let {blog, users} = this.props

    let user = users.find(user => user.id === blog.user)
    console.log('user of blog:',user)
      console.log('blog inside BLOG:',blog)
    /*
    if (!blog) {
        console.log(this.props.users)
        console.log(this.props.match)
        u = this.props.users.find(u => u._id===this.props.match)
    }
*/
    return (
        <div>
            <h2>{blog.title}</h2>
            <a href={blog.url}>{blog.url}</a>   <br/>  
            <comment>TODO:IF onclick would be without () =>, this would launch infinite amount of auto likes. When time dig deeper into what's going on.</comment><br/>
            {blog.votes} likes <button onClick={() => this.props.like(blog)}>like</button><br/>
            added by {blog.user.name}
        </div>
        
        )
    }
}

/*
const mapStateToProps = (state, props) => {
    const { userId } = props
  
    if (state.users === null) {
      return { user: null }
    }
  
    return {
      user: state.users.find(user => user._id===userId)
    }
  }
  
  export default connect(mapStateToProps)(User)
*/


/*
const mapStateToProps = (state) => {
    return {     
      blogs: state.blogs
    }
  }
  
  export default connect(
    mapStateToProps
  )(Blog)
*/


//export default Blog


const mapStateToProps = (state, props) => {
  const { blogId } = props

  console.log('at Blog.js mapStateTOProps, blogId',blogId)
  if (state.blogs === null) {
    return { blog: null }
  }


  console.log('at Blog.js mapStateTOProps, blog found based on blogid',state.blogs.find(blog => blog._id === blogId))

  return {
    blog: state.blogs.find(blog => blog._id === blogId),

    users: state.users
  }
}

export default connect(mapStateToProps, {
  like
})(Blog)

//export default connect(mapStateToProps)(Blog)
