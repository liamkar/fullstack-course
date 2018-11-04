const dummy = (blogs) => {
    return 1
  }
  
  const totalLikes = (blogs) => {
    
    let totalLikes = 0
    for (var blog of blogs) {
        totalLikes +=blog.likes
      }
      return totalLikes
  }


  const favoriteBlog = (blogs) => {
    
    let mostLikes = 0
    let mostLikedBlog = undefined

    for (var blog of blogs) {
        if (blog.likes > mostLikes) {
          mostLikes = blog.likes
          mostLikedBlog = blog
        }
      }

      if (mostLikedBlog) {

      return {
              "title": mostLikedBlog.title,
              "author": mostLikedBlog.author,
              "likes": mostLikes
              }
            }
            else {
              return mostLikedBlog
            }
  }



  const mostBlogs = (blogs) => {
  
    let mostBlogs = new Map()

    for (var blog of blogs) {
        let author = blog.author
        if (mostBlogs.has(author)) {
          let count = mostBlogs.get(author)
          mostBlogs.set(author,++count)
        }
        else {
          mostBlogs.set(author, 1)
        }
    }

    let authorWithMostBlogs 
    let amountOfBlogs = 0

    function logMapElements(value, key, map) {
      if (value > amountOfBlogs) {
        amountOfBlogs = value
        authorWithMostBlogs = key
      }
    }
    
    mostBlogs.forEach(logMapElements)

    return {
      "author": authorWithMostBlogs,
      "blogs": amountOfBlogs
    }
  }

  const mostLikes = (blogs) => {
  
    let mostLikes = new Map()

    for (var blog of blogs) {
        let author = blog.author
        if (mostLikes.has(author)) {
          let count = mostLikes.get(author)
          mostLikes.set(author,count+blog.likes)
        }
        else {
          mostLikes.set(author, blog.likes)
        }
    }

    let authorWithMostLikes 
    let amountOfLikes = 0

    function logMapElements(value, key, map) {
      if (value > amountOfLikes) {
        amountOfLikes = value
        authorWithMostLikes = key
      }
    }
    
    mostLikes.forEach(logMapElements)

    return {
      "author": authorWithMostLikes,
      "likes": amountOfLikes
    }
  }


  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }