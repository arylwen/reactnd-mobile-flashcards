import React from 'react'
import { View, Text } from 'react-native'
import { NavigationActions } from 'react-navigation'
import{
    Badge,
    Button,
    Card
} from 'react-native-elements'
import {
    clearAllNotifications,
    scheduleStudyReminderNotification,
} from '../api/notifications-api'
import { palette } from '../api/palette-api'

class QuizMe extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params.navTitle
        }
    }

    state = {
        cards: this.mixCards(),
        showFront: true,
        currentCard: 0,
        goodAnswers: 0
    }

    resetNotification(){
        clearAllNotifications()
            .then(scheduleStudyReminderNotification)
    }

    backToDeck() {
        const backAction = NavigationActions.back()
        this.resetQuiz()
        this.props.navigation.dispatch(backAction)
        this.resetNotification()
    }

    resetQuiz(){
        this.setState( () => {
            return{
                cards: this.mixCards(),
                showFront: true,
                currentCard: 0,
                goodAnswers: 0,
            }
        })
        this.resetNotification()
    }

    /**
     * Fisher-Yeats Shuffle Algorithm
     * https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
     */
    mixCards() {
        var j, x, i;
        const a = this.props.navigation.state.params.cards
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }

        return a
    }

    renderCard(){
        const {
            cards,
            currentCard,
            goodAnswers
        } = this.state

        //console.log('render-card', this.state)
        if( currentCard < cards.length ){
            return (
                <Card
                    title = {
                        this.state.showFront
                        ? `${cards[currentCard].front}`
                        : `${cards[currentCard].back}`
                    } 
                >
                    <View>
                        <Text
                            style = {styles.cardsLeft}
                        >
                            {`Card ${currentCard+1} of ${cards.length}`}
                        </Text>
                    </View>    
                    <View style={styles.badgeStyle}>
                        <Badge
                            containerStyle={palette.lightPrimaryColor}
                            onPress={() => this.setState({showFront: !this.state.showFront})}
                        >
                            <Text>
                                {this.state.showFront ? "Display Card Back" : "Display Card Front"}
                            </Text>    
                        </Badge>
                    </View>
                    <Button
                        buttonStyle={styles.buttonStyle}
                        title='Yep'
                        backgroundColor={palette.darkPrimaryColor.backgroundColor}
                        onPress={()=>{
                            this.setState({
                                currentCard:currentCard+1,
                                goodAnswers: goodAnswers+1,
                            })
                        }}
                    />
                    <Button
                        buttonStyle={[styles.buttonStyle, {marginTop: 10}]}
                        title='Nope'
                        backgroundColor={palette.accentColor.backgroundColor}
                        onPress={()=>{
                            this.setState({
                                currentCard:currentCard+1
                            })
                        }}
                    />
                </Card>
            )
        } else {
            return(
                <Card
                    title={`You answered corectly ${goodAnswers} questions out of ${cards.length}`}
                >
                    <Button
                        buttonStyle={styles.buttonStyle}
                        title="Start Over"
                        backgroundColor={palette.accentColor.backgroundColor}
                        onPress={() => this.resetQuiz()}
                    />
                    <Button
                        buttonStyle={[styles.buttonStyle, {marginTop:10}]}
                        title="Back to Deck"
                        backgroundColor={palette.darkPrimaryColor.backgroundColor}
                        onPress={() => this.backToDeck()}
                    />
                </Card>
            )
        }
    }

    render(){
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignContent: 'center'
                }}>
                {this.renderCard()}
            </View>    
        )
    }
}

const styles = {
    buttonStyle: {
        borderRadius: 0,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
    },
    cardsLeft: {
        textAlign: 'center',
        marginBottom: 10,
    },
    badgeStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50,
        marginTop: 0,
    }
}

export default QuizMe