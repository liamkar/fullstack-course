import React from 'react'
import { connect } from 'react-redux'
import { login, handleLoginFieldChange } from './../reducers/userReducer'
//import { login } from './../reducers/userReducer'

//const Login = ({handleSubmit, handleBlogChange, title, author, url}) => (
    
//if (this.state.user === null) {




  //reason why LoginForm here was transformed into a class component was
  //that it was at least one way to give onLogin-function access to state in props.
  //const Login = (props) => (
  class Login extends React.Component {


    //const onLogin = (e) => {
    onLogin = async (e) => {
      e.preventDefault()
      console.log('on login submit')
      console.log(this.props.loggedInUser)
      this.props.login(this.props.loggedInUser.name, this.props.loggedInUser.password)
      //props.login
      /*
      if (window.confirm("Do you really want to delete this blog?")) { 
        var blogId = this.props.blog._id
        console.log(this.props.handleDelete)
        this.props.handleDelete(this.props.blog._id)
        //window.open("exit.html", "Thanks for Visiting!");
      }
      */
    }


    render() {
      return (
      <div>
        <h2>Kirjaudu</h2>

       <form onSubmit={this.onLogin}>
       
          <div>
            käyttäjätunnus
          <input
              type="text"
              name="NAME"
              value={this.props.username}
              onChange={this.props.handleLoginFieldChange}
            />
          </div>
          <div>
            salasana
          <input
              type="password"
              name="PASSWORD"
              value={this.props.password}
              onChange={this.props.handleLoginFieldChange}
            />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
        </div>
      )

      }    
    }
//export default Login

const mapStateToProps = (state) => {
    console.log('mapStateToProps at Login.js:',state)
    return {
        loggedInUser: state.loggedInUser
    }
  }
  
  export default connect(
    //null,
    mapStateToProps,
    { login, handleLoginFieldChange }
  )(Login)

/*
  const mapStateToProps = (state) => {
    return {
      //visibleNotes: notesToShow(state.notes, state.filter)
      blogs: state.blogs
    }
  }

  
  export default connect(
      mapStateToProps,
      { like, deleteBlog }
    )(BlogList)
*/