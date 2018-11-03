const listHelper = require('../utils/list_helper')

describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]
  
    const emptyList = []

    const listWithTwoBlogs = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        },
        {
            _id: '5a422aa7ööö4a676234d17f8',
            title: 'Hey Hey',
            author: 'My my',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 1,
            __v: 0
          }
      ]

    test('when list has only one blog equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })

    test('when list has no items at all result should be zero', () => {
        const result = listHelper.totalLikes(emptyList)
        expect(result).toBe(0)
      })

      test('when list has more than one item result should be a combination of all', () => {
        const result = listHelper.totalLikes(listWithTwoBlogs)
        expect(result).toBe(6)
      })

  })

  describe('most likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]
  
    const emptyList = []

    const listWithTwoBlogs = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        },
        {
            _id: '5a422aa7ööö4a676234d17f8',
            title: 'Hey Hey',
            author: 'My my',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 1,
            __v: 0
          }
      ]

    test('when list has only one blog equals the likes of that', () => {
      const result = listHelper.mostLikes(listWithOneBlog)
      expect(result).toBe(listWithOneBlog[0])
    })

    test('when list has no items at all result should be undefined', () => {
        const result = listHelper.mostLikes(emptyList)
        expect(result).toBe(undefined)
      })

      test('when list has more than one item result should be object containing the highest of all', () => {
        const result = listHelper.mostLikes(listWithTwoBlogs)
        expect(result).toBe(listWithTwoBlogs[0])
      })

  })