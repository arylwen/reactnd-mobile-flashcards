import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import AddDeck from './components/AddDeck'
import AddCard from './components/AddCard'
import AllDecks from './components/AllDecks'
import EditDeck from './components/EditDeck'
import QuizMe from './components/QuizMe'
import FociStatusBar from './components/FociStatusBar'
import { scheduleStudyReminderNotification } from './api/notifications-api'
import { palette } from './api/palette-api'
import Reducer from './reducers'

//console.log(palette)
const TINT_COLOR = palette.textPrimaryColor.color
const BACKGROUND_COLOR = palette.defaultPrimaryColor.backgroundColor

const Decks=TabNavigator(
  {
    AllDecks: {
      screen: AllDecks,
      navigationOptions: {
        tabBarLabel: 'All Foci',
        tabBarIcon: ({tintColor}) => <Ionicons 
                                      name="ios-home" 
                                      size={30} color={tintColor} />
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: 'Add Focus',
        tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square'
                                                    size={30}
                                                    color={tintColor}
                                       />
      }
    }   
  },
  {
    tabBarOptions:{
      activeTintColor: TINT_COLOR,
      showIcon: true,
      style:{
        backgroundColor: BACKGROUND_COLOR
      }
    }
  })
 
const Main = StackNavigator ({
  Home: {
    screen: Decks,
    navigationOptions: {
      headerTintColor: TINT_COLOR,
      headerStyle: {
        backgroundColor: BACKGROUND_COLOR
      },
      title: 'Foci - Focused Learning'
    },
    animationEnabled: true
  },
  EditDeck: {
    screen: EditDeck,
    navigationOptions: {
      headerTintColor: TINT_COLOR,
      headerStyle: {
        backgroundColor: BACKGROUND_COLOR
      }
    }  
  },
  QuizMe: {
    screen: QuizMe,
    navigationOptions: {
      headerTintColor: TINT_COLOR,
      headerStyle: {
        backgroundColor: BACKGROUND_COLOR
      }
    }  
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: TINT_COLOR,
      headerStyle: {
        backgroundColor: BACKGROUND_COLOR
      }
    }  
  }
})

export default class App extends React.Component {

  componentDidMount(){
    scheduleStudyReminderNotification()
  }

  render() {
    const store = createStore(Reducer, compose(applyMiddleware(thunk)))
    //console.log('store created') 
          
    return (
      <Provider store={ store }>
        <View style={{flex:1}}>
          <FociStatusBar backgroundColor = {
                          palette.darkPrimaryColor.backgroundColor} 
                      barStyle="light-content" />
          <Main/>
        </View>
      </Provider>
    );
  }
}
