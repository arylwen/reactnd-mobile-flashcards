import { AsyncStorage } from 'react-native'

function guid() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		return v.toString(16);
	});
}

export function fetchAllDecksApi(){

}

export function createDeckApi(deckName){
    try{
        const key = guid()
        AsyncStorage.setItem(key,
            JSON.stringify({ name: deckName, cards: []}))
        return key    
    } catch (error)  {
        console.log(error)
    }
}

export function deleteDeckApi( deckId ){
    return AsyncStorage.removeItem( deckId )
}

export function getDeckApi( deckId ){
    return AsyncStorage.getItem( deckId )
}

export function getAllDecksApi(){
    return AsyncStorage.getAllKeys()
        .then( keys => {
            return AsyncStorage.multiGet(keys)
        })
}

export function updateCardsForDeckApi(deckId, cards){
    AsyncStorage.mergeItem(deckId, JSON.stringify({cards}))
    .catch( error => {
        console.log(error)
    })
}