import React from 'react'
import { connect } from 'react-redux'
import User from './User'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const UserList = (props) => (
    <div>
        <h2>users</h2>
        <Table striped>
      <tbody>
        
          <tr><th></th><th>Number of blogs</th></tr>
          
    {props.users.map(user =>
    
      <tr><td><Link to={`/users/${user.id}`}>{user.name}</Link></td><td>{user.blogs.length}</td></tr>
      /*
      <User
        key={user._id}
        user={user}
      />
      */
    )}
    </tbody>
    </Table>
  </div>
)

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}


export default connect(
    mapStateToProps
  )(UserList)