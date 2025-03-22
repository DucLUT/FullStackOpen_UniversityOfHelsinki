import ReactDOM from 'react-dom/client'
import { createStore , combineReducers} from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import anecReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
  anec: anecReducer,
  filter: filterReducer
})

const store = createStore(reducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)