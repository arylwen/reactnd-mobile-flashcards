import React from 'react'
import { connect } from 'react-redux'
import { 
    KeyboardAvoidingView,
    Keyboard,
    Text
 } from 'react-native'
import {
    Button,
    Card,
    FormInput,
    FormValidationMessage
} from 'react-native-elements'

import { createDeckThunk } from '../thunks/decks-thunks.js'
import { palette } from '../api/palette-api'

const BACKGROUND_COLOR = palette.defaultPrimaryColor.backgroundColor

class AddDeck extends React.Component {
    state = {
        deckNameText: '',
        errorMessage: false
    }

    componentWillReceiveProps(nextProps){
        //console.log(nextProps)
        if(nextProps.allDecks.newDeck){
            this.props.navigation.navigate(
                'EditDeck',
                {
                    entryId: nextProps.allDecks.newDeck.key,
                    navTitle: nextProps.allDecks.newDeck.name,
                }
            )
        }
        Keyboard.dismiss()
    }

    handleAddDeck = () => {
        if(this.state.deckNameText) 
        {
            const {deckNameText} = this.state
            this.props.createDeckThunk( deckNameText  )
            this.setState({
                deckNameText: '',
                errorMessage: false,
            })
        } else  
          this.setState({  errorMessage: true })
        
    }


    render(){
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <Card title="What topic will you focus on?" >
                    <FormInput
                        onChangeText = {deckNameText => this.setState({ deckNameText })}
                        value = {this.state.deckNameText}
                    />
                    <FormValidationMessage>
                        {this.state.errorMessage ? 'Deck name is required':''}
                    </FormValidationMessage>    
                    <Button 
                        title = "Add Focus"
                        raised
                        backgroundColor= {BACKGROUND_COLOR}
                        onPress={this.handleAddDeck}
                    />
                </Card>    
            </KeyboardAvoidingView>    
        )
    }
}

const styles = {
    container: {
        flex:1,
        justifyContent: 'flex-start'
    }
}

const mapStateToProps = state => {
    return state
} 

export default connect(mapStateToProps, { createDeckThunk })(AddDeck);
