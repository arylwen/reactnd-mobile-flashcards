import { combineReducers } from 'redux'
import AllDecksReducer from './AllDecksReducer'

export default combineReducers({
    allDecks: AllDecksReducer,
})