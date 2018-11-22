
/*
import React from 'react'

const Notification = ({ message, messagetype }) => {

   if (message === null) {
    return null
  }

    return (
      <div className={messagetype}>
        {message}
      </div>
    )
  }

  export default Notification
*/





import React from 'react'
import { connect } from 'react-redux'

console.log('connect',connect)

class Notification extends React.Component {
  render() {
    if (this.props.notification.length===0) {
      return null
    }
    
    //const style = {
    //  border: 'solid',
    //  padding: 10,
    //  borderWidth: 1
    //}
    
    //add className messagetype later after it's defined in reducer... className={this.props.messagetype}
    return (
      <div >
        {this.props.notification}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
    //notificationtype: state.notificationtype
  }
}

export default connect(mapStateToProps)(Notification)
