import React from 'react'
import {View,StyleSheet, Text, Image} from 'react-native'

const MessageListItem = props => {
    return (
        <View style={styles.listItem}>
            
                <Image
                source={props.userImage}
                style={{
                    width:40,
                    height:40,
                    borderRadius:20
                }}
                />
            
            <View>
                <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                    <Text>{props.userName}</Text>
                    <Text>{props.messageTime}</Text>
                </View>
                <Text>{props.messageText}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    listItem: {
        flexDirection:'row',
        padding:10,
    }
})

export default MessageListItem