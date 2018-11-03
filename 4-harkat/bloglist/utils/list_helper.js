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
      return mostLikedBlog
  }

  module.exports = {
    dummy,
    totalLikes,
    mostLikes
  }