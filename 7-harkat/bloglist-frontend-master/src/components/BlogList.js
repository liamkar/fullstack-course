import React from 'react'
import { connect } from 'react-redux'
//import { toggleVisibility } from './../reducers/blogReducer'
import { like } from './../reducers/blogReducer'
import Blog from './Blog'

//TODO: add toggleImportance eli tässä ohjelmassa TOggleVisibility myöhemmin.
const BlogList = (props) => (
    <div>
        <h2>blogs</h2>
    {props.blogs.map(blog =>
      <Blog
        key={blog._id}
        blog={blog}
        handleLikeClick={() => like(blog)}
        handleClick={() => props.like(blog)}
      />
    )}
  </div>
)

/*
const notesToShow = (notes, filter) => {
  if (filter === 'ALL') {
    return notes
  }
  return filter === 'IMPORTANT'
    ? notes.filter(note => note.important)
    : notes.filter(note => !note.important)
}
*/

const mapStateToProps = (state) => {
  return {
    //visibleNotes: notesToShow(state.notes, state.filter)
    blogs: state.blogs
  }
}
/*
export default connect(
  mapStateToProps,
  { toggleImportance }
)(BlogList)
*/

export default connect(
    mapStateToProps,
    { like }
  )(BlogList)