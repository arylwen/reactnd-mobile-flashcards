import { CREATE_DECK } from '../actions/decks-actions'
import { GET_ALL_DECKS } from '../actions/decks-actions'
import { GET_DECK } from '../actions/decks-actions'
import { DELETE_DECK } from '../actions/decks-actions'
import { ADD_CARD } from '../actions/decks-actions'

function AllDecksReducer(state={}, action ){
    switch (action.type) {
        case CREATE_DECK:
            //console.log('create-deck',action.deck, state)
            state.allDecks.push(action.deck)
            return {
                ...state,
                newDeck: action.deck,
                newCardAdded: false,
            }

        case GET_ALL_DECKS:
            return { 
                ...state,
                allDecks: action.allDecks ? action.allDecks : [],
                newCardAdded: false,
            }
              
        case GET_DECK:
            return {
                allDecks: state.allDecks.map( deck => {
                    if(deck.key === action.deck.key){
                        deck.cards = action.deck.cards
                    }
                    return deck
                }),
                deck: action.deck,
                newCardAdded: false,
            }
            
        case DELETE_DECK:
            return {
                ...state,
                allDecks: state.allDecks.filter( deck => { return deck.key != action.deletedDeckKey } ),
                newCardAdded: false,
            }    

        case ADD_CARD:
            return {
                ...state,
                deck: action.deck,
                newCardAdded : true,
            }    
        
        default:
            return state
    }   
}

export default AllDecksReducer