import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if (state.filter === 'ALL') {
      return state.anec // Return all anecdotes if the filter is 'ALL'
    }
    return state.anec.filter(anec =>
      anec.content.toLowerCase().includes(state.filter.toLowerCase()) // Filter anecdotes based on the filter text
    )
  })
  const dispatch = useDispatch()

  const handleVote = (id) => {
    dispatch(vote(id))
  }

  return (
    <div>
      {anecdotes
        .slice()
        .sort((a, b) => b.votes - a.votes) 
        .map(anecdote => (
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default AnecdoteList