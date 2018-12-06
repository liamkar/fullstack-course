import React from 'react'

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
    const {user} = this.props

    return (
        <tr><td>{user.name}</td><td>{user.blogs.length}</td></tr>
        )
    }
}

export default User

