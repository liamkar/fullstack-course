import React from 'react'
import { connect } from 'react-redux'
import User from './User'

const UserList = (props) => (
    <div>
        <h2>users</h2>
        <table>
          <tr><th></th><th>Number of blogs</th></tr>
          
    {props.users.map(user =>
      <User
        key={user._id}
        user={user}
      />
    )}
    </table>
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