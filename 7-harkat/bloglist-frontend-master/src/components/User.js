import React from 'react'
import { connect } from 'react-redux'
/*
const userStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  //border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}
*/

class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      //extent of visibility of each blog is defined here. 
      //because of the need for this attribute, Blog was created as class Component.
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({visible: !this.state.visible})
  }


render() {

    //const showWhenVisible = { display: this.state.visible ? '' : 'none' }
    //const { user, handleClick } = this.props
    console.log('this.props at User.js',this.props.user)
    let {user} = this.props

    if (!user) {
        console.log(this.props.users)
        console.log(this.props.match)
        user = this.props.users.find(u => u._id===this.props.match)
    }

    return (
        <div>
            <h2>{user.name}</h2>
            <h3>added blogs</h3>
            <ul>
            {user.blogs.map(blog => 
                <li>{blog.title}</li>
                )}
            </ul>
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


const mapStateToProps = (state) => {
    return {     
      users: state.users
    }
  }
  
  export default connect(
    mapStateToProps
  )(User)



//export default User

