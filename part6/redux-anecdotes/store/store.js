import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from '../src/reducers/anecdoteReducer'
import filterReducer from '../src/reducers/filterReducer'
import notificationReducer from '../src/reducers/notificationReducer'  

const store = configureStore({
  reducer: {
    anec: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer, 
  },
})

export default store