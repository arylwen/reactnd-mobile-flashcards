export const CREATE_DECK = 'CREATE_DECK'
export const GET_ALL_DECKS = "GET_ALL_DECKS"
export const GET_DECK = 'GET_DECK'
export const DELETE_DECK = 'DELETE_DECK'
export const ADD_CARD = 'ADD_CARD'

export function createDeckAction(deck){
    return {
        type: CREATE_DECK,
        deck
    }
}

export function getAllDecksAction( allDecks ){
    return {
        type: GET_ALL_DECKS,
        allDecks,
    }
}

export function getDeckAction( deck ){
    return {
        type: GET_DECK,
        deck,
    }
}

export function deleteDeckAction( deletedDeckKey ){
    return {
        type: DELETE_DECK,
        deletedDeckKey,
    }
}

export function addCardAction( deck ){
    return {
        type: ADD_CARD,
        deck,
    }
}    