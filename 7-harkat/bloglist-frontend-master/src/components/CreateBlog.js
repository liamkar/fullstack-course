import React from 'react'

//-Reactin suosittelemaan tyyliin tila ja tilaa käsittelevät funktiot on kaikki määritelty komponentin ulkopuolella ja välitetään komponentille propseina.
const CreateBlog = ({handleSubmit, handleBlogChange, title, author, url}) => (
    <div>
    <h2>create new</h2>

      <form onSubmit={handleSubmit}>
        Title:<input
          type="text"
          name="newtitle"
          value={title}
          onChange={handleBlogChange}
        />
        <br/>
        Author:<input
          type="text"
          name="newauthor"
          value={author}
          onChange={handleBlogChange}
        />
        <br/>
        Url:<input
          type="text"
          name="newurl"
          value={url}
          onChange={handleBlogChange}
        />
        <button type="submit">tallenna</button>
      </form>
      </div>
)

export default CreateBlog