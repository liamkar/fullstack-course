import anecdoteService from '../services/anecdotes'
/*
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
*/

/*
const getId = () => (100000*Math.random()).toFixed(0)


const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}
*/

//const initialState = anecdotesAtStart.map(asObject)

//TODO: it's preferred to use switch case here:
//const reducer = (store = initialState, action) => {
  const reducer = (store = [], action) => {
  if (action.type==='VOTE') {

    //TODO:talleteaankin tämä kantaan ensin - päivitetään sen yhteydessä voten arvoa - ei siis enää täällä
    //-->täällä päivitetään ainoastaan storea jatkossa:
    /*
    const old = store.filter(a => a.id !==action.data.id)
    const voted = store.find(a => a.id === action.data.id)
    return [...old, { ...voted, votes: voted.votes+1} ]
    */

   console.log('action at VOTE reducer',action)
   const listOfNotUpdatedAnecdotes = store.filter(a => a.id !==action.anecdote.id)
   console.log('listOfNotUpdatedAnecdotes',listOfNotUpdatedAnecdotes)
   return [...listOfNotUpdatedAnecdotes, action.anecdote ]

  }
  if (action.type === 'CREATE') {

    //return [...store, { content: action.data.content, id: getId(), votes:0 }]
    return [...store, action.data]
  }
  if (action.type === 'INIT_ANECDOTES') {
    console.log('at INIT_ANECDOTES:',action.data)
    return action.data
  }

  return store
}


/*
export const anecdoteCreation = (data) => {
  return {
    type: 'CREATE',
    data
  }
}
*/

export const anecdoteCreation = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}


/*
export const anecdoteVote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
    //id
  }
}
*/

/*
export const anecdoteVote = (anecdote) => {
  return {
    type: 'VOTE',
    anecdote
    //id
  }
}
*/

export const anecdoteVote = (anecdote) => {
  return async (dispatch) => {
    anecdote.votes = anecdote.votes+1
    const updatedAnecdote = await anecdoteService.update(anecdote.id,anecdote)

    //const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'VOTE',
      anecdote: updatedAnecdote
    })
  }
}


/*
export const anecdoteInitialization = (data) => {
  return {
    type: 'INIT_ANECDOTES',
    data
  }
}
*/

//redux-thunkin ansiosta on mahdollista määritellä action creatoreja siten, että ne palauttavat funktion, jonka parametrina on redux-storen dispatch-metodi. Tämän ansiosta on mahdollista tehdä asynkronisia action creatoreja, jotka ensin odottavat jonkin toimenpiteen valmistumista ja vasta sen jälkeen dispatchaavat varsinaisen actionin.
export const anecdoteInitialization = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}



export default reducer