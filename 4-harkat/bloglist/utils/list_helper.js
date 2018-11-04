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


  const mostLikes = (blogs) => {
    
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
      //mostLikedBlog        
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
  }



  module.exports = {
    dummy,
    totalLikes,
    mostLikes,
    mostBlogs
  }