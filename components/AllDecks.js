import React from 'react'
import { connect } from 'react-redux'
import { View, 
         Text, 
         FlatList, 
         TouchableOpacity } from 'react-native'
import { Card, Badge } from 'react-native-elements'

import { getAllDecksThunk } from '../thunks/decks-thunks'
import { palette } from '../api/palette-api'


class AllDecks extends React.Component {

    componentWillMount(){
        this.props.getAllDecksThunk()
    }

    renderItem = ( {item} ) => {
        //console.log('renderItem: ',  this.props)
        return(
        <TouchableOpacity
            onPress = { () => this.props.navigation.navigate(
                'EditDeck',
                {
                    entryId: item.key,
                    navTitle: item.name,
                }
            ) } 
        >       
            <View>
                <Card
                    title={item.name} 
                >
                    <Badge
                        containerStyle={palette.lightPrimaryColor}
                    >
                        <Text>
                            {`${item.cards.length} cards`}
                        </Text>
                    </Badge>
                </Card>
            </View>
        </TouchableOpacity>    
        )    
    }

    render(){
        //console.log('allDecks: render', this.props)
        return (
            <View style={styles.containerStyle}>
                {this.props.allDecks.length > 0
                    ? <FlatList
                        data={this.props.allDecks}
                        extraData= {this.props}
                        renderItem={this.renderItem}
                        {...this.props}
                      />
                    : <Card title="Start by creating a new Focus!" /> 
                }
            </View>    
        )
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        alignSelf: 'stretch'
    }
}

function mapStateToProps(state){
    //console.log("All Decks - mapStateToProps", state)
    return {allDecks: state.allDecks.allDecks ? state.allDecks.allDecks : []}
}

export default connect(mapStateToProps, {getAllDecksThunk})(AllDecks)