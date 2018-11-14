import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
  it('renders content', () => {
    const blog = {
        title: 'nabonabo',
        author: 'Ville Totti',
        url: 'www,test.com',
        votes: 999,
    }

    const simpleBlogComponent = shallow(<SimpleBlog blog={blog} />)
    const contentDiv = simpleBlogComponent.find('.content')

    expect(contentDiv.text()).toContain(blog.title)
    expect(contentDiv.text()).toContain(blog.author)

    const votesDiv = simpleBlogComponent.find('.votes')
    expect(votesDiv.text()).toContain(blog.votes)
  })
})