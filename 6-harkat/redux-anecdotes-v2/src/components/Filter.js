import React from 'react'
import { connect } from 'react-redux'

/*
import { anecdoteVote } from './../reducers/anecdoteReducer'
import { notificationSetting } from './../reducers/notificationReducer'
import { notificationRemove } from './../reducers/notificationReducer'
*/

import { filterChange } from './../reducers/filterReducer'

class Filter extends React.Component {
    handleChange = (event) => {
      // input-kentän arvo muuttujassa event.target.value
      //this.props.store.dispatch(filterChange(event.target.value))
      this.props.filterChange(event.target.value)
    }
    render() {
      const style = {
        marginBottom: 10
      }
  
      return (
        <div style={style}>
          filter <input onChange={this.handleChange}/>
        </div>
      )
    }
  }

//export default Filter

//this is actually not needed here 
//TODO: how to leave this empty/undefined
const mapStateToProps = (state) => {
    return {
      notification: state.notification
    }
  }

  const mapDispatchToProps = {
    filterChange
  }
  
  const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter)
  
  export default ConnectedFilter