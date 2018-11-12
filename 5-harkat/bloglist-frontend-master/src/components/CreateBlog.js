import React from 'react'
const CreateBlog = ({blog}) => (
    <div>
    <h2>create new</h2>

      <form onSubmit={this.addBlog}>
        Title:<input
          type="text"
          name="newtitle"
          value={this.state.newTitle}
          onChange={this.handleBlogChange}
        />
        <br/>
        Author:<input
          type="text"
          name="newauthor"
          value={this.state.newAuthor}
          onChange={this.handleBlogChange}
        />
        <br/>
        Url:<input
          type="text"
          name="newurl"
          value={this.state.newUrl}
          onChange={this.handleBlogChange}
        />
        <button type="submit">tallenna</button>
      </form>
      </div>
)

export default CreateBlog