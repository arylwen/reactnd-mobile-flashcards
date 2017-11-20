import React from 'react'
import { View, Text, Alert } from 'react-native'
import { Card, Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { getDeckThunk} from '../thunks/decks-thunks'
import { deleteDeckThunk } from '../thunks/decks-thunks'
import { palette } from '../api/palette-api'

class EditDeck extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params.navTitle
        }
    }

    componentWillMount(){
        this.props.getDeckThunk(
            this.props.navigation.state.params.entryId
        )
    }

    componentWillReceiveProps(nextProps){
        //console.log('component-will-receive-props', nextProps)
        if(nextProps.newCardAdded){
            this.props.getDeckThunk(
                this.props.navigation.state.params.entryId
            )                        
        }
    }

    deleteItem(){
        //console.log('delete-item', this.props)
        const key = this.props.deck.key
        this.props.deleteDeckThunk(key)
        this.props.navigation.goBack()
    }

    render(){
        return (
            <View 
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignContent: 'center',
                }}
            >
                <Card title={this.props.name}>
                    <Text style={{
                            marginBottom: 10,
                            textAlign: 'center'
                        }} 
                    >
                        {this.props.deck ? this.props.deck.cards.length:0} cards
                    </Text>
                    <View>
                        <Button
                            icon={{name: 'add-circle'}}
                            backgroundColor={palette.defaultPrimaryColor.backgroundColor}
                            buttonStyle={styles.buttonStyle}
                            title='Add Card'
                            onPress={() => {
                                this.props.navigation.navigate(
                                    'AddCard',
                                    {
                                        navTitle: this.props.deck.name,
                                        key: this.props.deck.key,
                                    }
                                )
                            }

                            }
                        />
                    </View>    
                    <View>
                        <Button
                            icon={{name: 'play-arrow'}}
                            backgroundColor={palette.accentColor.backgroundColor}
                            buttonStyle={[styles.buttonStyle, {marginTop: 10}]}
                            title = 'Quiz Me'
                            onPress={ () => {
                                this.props.navigation.navigate(
                                    'QuizMe',
                                    {
                                        navTitle: this.props.deck.name,
                                        cards: this.props.deck.cards
                                    }
                                )
                            }}
                        />
                    </View>    
                    <View>
                        <Button
                            title="Delete Focus"
                            buttonStyle={[styles.buttonStyle, {marginTop: 50}]}
                            backgroundColor={palette.lightPrimaryColor.backgroundColor}
                            onPress={() => Alert.alert(
                                'Delete Focus?',
                                'This operation cannot be undone.',
                                [
                                    {text: 'Cancel'},
                                    {text: 'OK', onPress: () =>  this.deleteItem()},
                                ]
                            )}
                        />    
                    </View>    

                </Card>
            </View>    
        )
    }
}

const styles= {
    buttonStyle: {
        borderRadius: 0,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
    }    
}

function mapStateToProps(state) {
    //console.log('edit-deck-mapStateToProps', state)
    return {
        deck: state.allDecks.deck,
        newCardAdded: state.allDecks.newCardAdded,
    }
}

export default connect(
    mapStateToProps, 
    {
        getDeckThunk,
        deleteDeckThunk
    }
)(EditDeck)