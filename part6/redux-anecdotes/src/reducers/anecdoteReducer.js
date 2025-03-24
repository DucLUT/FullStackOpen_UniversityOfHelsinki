import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState : [],
  reducers: {
    vote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(anecdote => anecdote.id === id)
      if (anecdoteToVote) {
        anecdoteToVote.votes += 1
      }
    },
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    setAll(state, action){
      return action.payload
    }
  },
})

export const { vote, createAnecdote, setAll } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAll(anecdotes))
  }
}

export const makeAnecdote = (content) => {
  return async dispatch => {
    const response = await anecdoteService.createNew(content)
    dispatch(createAnecdote(response))
  }
}

export const voteToBe = (id) => {
  return async (dispatch, getState) => {

    const state = getState().anec
    const anecdoteToUpdate = state.find(anecdote => anecdote.id === id)

    if (anecdoteToUpdate) {
      const updatedAnecdote = {
        ...anecdoteToUpdate,
        votes: anecdoteToUpdate.votes + 1,
      }
      const response = await anecdoteService.updateAnecdote(id, updatedAnecdote)
      dispatch(vote(response.id))
    }
  }
}

export default anecdoteSlice.reducer