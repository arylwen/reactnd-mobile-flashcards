import React from 'react'
import { connect } from 'react-redux'
import { KeyboardAvoidingView, Keyboard, TextInput } from 'react-native'
import {
    Card,
    Button,
    FormLabel,
    FormValidationMessage
} from 'react-native-elements'
import { addCardToDeckThunk } from '../thunks/decks-thunks'

class AddCard extends React.Component {
    state = {
        frontText: '', 
        backText: '',
        errorMessage: ''
    }

    static navigationOptions = ( {navigation} ) => {
        return {
            title: navigation.state.params.navTitle
        }
    }

    handleSubmit = () => {
        if(this.state.frontText && this.state.backText){
            const{ frontText, backText } = this.state
            const key = this.props.navigation.state.params.key
            //console.log('handleSubmit', key)

            const card = {
                front: frontText,
                back: backText,
            }

            this.props.addCardToDeckThunk(key, card)

            this.setState({
                errorMessage: false,
                frontText: '',
                backText: '',
            })

            this.props.navigation.goBack(Keyboard.dismiss())
        } else {
            this.setState({ errorMessage: true })
        }
    }

    render(){
        return (
            <KeyboardAvoidingView
                stye={{
                    flex:1,
                    jusifyContent: 'center',
                    alignContent: 'center'
                }}
                behavior='padding'
            >
                <Card title='Add a card'>
                     <FormLabel>Front:</FormLabel>
                     <TextInput
                        multiline={true}
                        numberOfLines={2}
                        underlineColorAndroid = 'transparent'
                        onChangeText={ frontText => this.setState({ frontText })}
                        value={this.state.frontText}
                     /> 
                     <FormLabel>Back:</FormLabel>
                     <TextInput
                        multiline={true}
                        numberOfLines={4}
                        underlineColorAndroid = 'transparent'
                        onChangeText={ backText => this.setState({ backText })}
                        value={this.state.backText}
                     />
                     <FormValidationMessage>
                         {this.state.errorMessage ? 'Please enter both front and back of the card':''}
                     </FormValidationMessage>    
                     <Button
                        title = 'Submit'
                        raised
                        backgroundColor='rgb(72, 149, 236)'
                        onPress={this.handleSubmit}
                     />
                </Card>
            </KeyboardAvoidingView>    
        )
    }
}

function mapStateToProps(state){
    return state
}

export default connect(mapStateToProps, 
    {
        addCardToDeckThunk,
    }
)(AddCard)