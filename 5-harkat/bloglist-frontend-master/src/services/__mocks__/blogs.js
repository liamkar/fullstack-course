let token = null

const blogs = [
  {
    id: "5a451df7571c224a31b5c8ce",
    title: "HTML on helppoa",
    author: "Cave",
    url: "www.false.com",
    votes: 18,
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "mluukkai",
      name: "Matti Luukkainen"
    }
  },
  {
    id: "5a451e21e0b8b04a45638211",
    title: "Selain pystyy suorittamaan vain javascriptiä",
    author: "Cohen",
    url: "www.false.com",
    votes: 17,
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "mluukkai",
      name: "Matti Luukkainen"
    }
  },
  {
    id: "5a451e30b5ffd44a58fa79ab",
    title: "HTTP-protokollan tärkeimmät metodit ovat GET ja POST",
    author: "Dylan",
    url: "www.false.com",
    votes: 12,
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "mluukkai",
      name: "Matti Luukkainen"
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = () => {
    console.log('not really doing anything here at setToken but just hoping to get away with a running test with this dummy implementation')
}

export default { getAll, blogs, setToken } 