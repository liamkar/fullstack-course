import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe.only('<Blog />', () => {
  let blogComponent


  const userTest = {
    username: 'villek',
    name:'ville'
  }

  const blog = {
    title: 'nabonabo',
    author: 'Ville Totti',
    url: 'www,test.com',
    votes: 999,
    //user: {username: 'villek', name:'ville'}
    user: userTest
}


  beforeEach(() => {
    blogComponent = shallow(<Blog blog={blog} user={userTest} />)
  })

  it('renders content', () => {
    //const blogComponent = shallow(<Blog blog={blog} />)
    const contentDiv = blogComponent.find('.content')

    expect(contentDiv.text()).toContain(blog.title)
    expect(contentDiv.text()).toContain(blog.author)

  })

  it('at start the votes are not displayed', () => {
    const div = blogComponent.find('.votes')
    expect(div.getElement().props.style).toEqual({ display: 'none' })
  })


  it('after clicking name the votes etc. are displayed', () => {
    // haetaan klikattava osa komponentista
    const contentDiv = blogComponent.find('.content')

    contentDiv.simulate('click')
  
    // haetaan tarkastettava, eli detaljit sisältävä osa komponentista
    const div = blogComponent.find('.votes')

    expect(div.getElement().props.style).toEqual({ display: '' })
  })

})

