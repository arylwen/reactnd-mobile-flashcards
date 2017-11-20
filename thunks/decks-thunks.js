import { createDeckApi } from '../api/decks-api'
import { createDeckAction } from '../actions/decks-actions'
import { getAllDecksApi } from '../api/decks-api'
import { getAllDecksAction } from '../actions/decks-actions'
import { getDeckApi } from '../api/decks-api'
import { getDeckAction } from '../actions/decks-actions'
import { deleteDeckApi } from '../api/decks-api'
import { deleteDeckAction } from '../actions/decks-actions'
import { updateCardsForDeckApi } from '../api/decks-api'
import { addCardAction } from '../actions/decks-actions'

export function createDeckThunk(deckName){
    return dispatch => {
        let key = createDeckApi(deckName)
        //console.log("createDeckThunk ", key)
        const newDeck={
            key,
            name: deckName, 
            cards: [],
        }
        dispatch(createDeckAction(newDeck))
    }

}

export function getAllDecksThunk(){
    return dispatch => {
        getAllDecksApi()
        .then( items => {
            //console.log(items)
            let allDecks = items.map( item => {
                let key = item[0]
                let value = JSON.parse(item[1])
                if(value && value.cards) {
                    return {
                        key,
                        name: value.name,
                        cards: value.cards,
                    }
                }
            }).filter( item => {
                if(item){
                    return item.cards ? true : false
                }
            })
        
            //console.log("decks-thunks", allDecks)
            dispatch(getAllDecksAction(allDecks))
        
        })
    }
}

export function addCardToDeckThunk(deckId, card){
    return dispatch => {
        getDeckApi(deckId).then( deck => {
            const data = JSON.parse(deck)
            //console.log('add-card-to-deck-thunk', data)
            let cards = data.cards
            cards.push(card)

            updateCardsForDeckApi(deckId, cards)
        })

        getDeckApi(deckId).then( deck => {
            dispatch(addCardAction( JSON.parse(deck) ))            
        })
    }
}

export function getDeckThunk(deckId){
    return dispatch => {
        getDeckApi(deckId)
            .then( deck => {
                deckAsObject = JSON.parse(deck)
                const deckWithId = {
                    ...deckAsObject,
                    key: deckId,
                }
                //console.log('get-deck-thunk', deckWithId)
                dispatch(getDeckAction(deckWithId))
            })
    }
}

export function deleteDeckThunk(deckId){
    return (dispatch) => {
        deleteDeckApi( deckId )
            .then( data => {
                dispatch(deleteDeckAction(deckId))
            })
    }
}