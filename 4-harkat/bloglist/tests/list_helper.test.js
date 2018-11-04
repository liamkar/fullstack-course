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
            likes: 6,
            __v: 0
          }
      ]

    test('when list has only one blog equals the likes of that', () => {
      const result = listHelper.favoriteBlog(listWithOneBlog)
      expect(result.title).toEqual('Go To Statement Considered Harmful')
      expect(result.author).toEqual('Edsger W. Dijkstra')
      expect(result.likes).toEqual(5)
    })

    test('when list has no items at all result should be undefined', () => {
        const result = listHelper.favoriteBlog(emptyList)
        expect(result).toBe(undefined)
      })

      test('when list has more than one item result should be object containing the highest of all', () => {
        const result = listHelper.favoriteBlog(listWithTwoBlogs)
        expect(result.title).toEqual('Hey Hey')
        expect(result.author).toEqual('My my')
        expect(result.likes).toEqual(6)
  
      })

  })



  describe('most blogs', () => {
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
            likes: 6,
            __v: 0
          }
      ]

      const listWithFiveBlogs = [
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
            likes: 6,
            __v: 0
          },
          {
              _id: '5a422aa7ööö4a676234d17f8',
              title: 'Hey Hey',
              author: 'My my',
              url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
              likes: 6,
              __v: 0
            },
            {
                _id: '5a422aa7ööö4a676234d17f8',
                title: 'Hey Hey',
                author: 'My my',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 6,
                __v: 0
              },
              {
                  _id: '5a422aa7ööö4a676234d17f8',
                  title: 'Hey Hey',
                  author: 'My my',
                  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                  likes: 6,
                  __v: 0
                }
      ]

    test('when list has only one blog equals the info of that', () => {
      const result = listHelper.mostBlogs(listWithOneBlog)
      expect(result.author).toEqual('Edsger W. Dijkstra')
      expect(result.blogs).toEqual(1)
    })

    test('when list has no items at all result should be undefined', () => {
        const result = listHelper.mostBlogs(emptyList)
        expect(result.author).toBe(undefined)
        expect(result.blogs).toEqual(0)
      })

      test('when list has more than one items result should containg the author who had most items in the list', () => {
        const result = listHelper.mostBlogs(listWithFiveBlogs)
        expect(result.author).toEqual('My my')
        expect(result.blogs).toEqual(4)  
      })

  })