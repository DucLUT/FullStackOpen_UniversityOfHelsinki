import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotificationWithTimeout } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if (state.filter === 'ALL') {
      return state.anec
    }
    return state.anec.filter(anec =>
      anec.content.toLowerCase().includes(state.filter.toLowerCase())
    )
  })
  const dispatch = useDispatch()

  const handleVote = (id, content) => {
    dispatch(vote(id))
    dispatch(setNotificationWithTimeout(`You voted for "${content}"`, 5000)) 
  }

  return (
    <div>
      {[...anecdotes]
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote => (
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote.id, anecdote.content)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default AnecdoteList