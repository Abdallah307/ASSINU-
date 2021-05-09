import React from 'react'
import {View, StyleSheet, Text} from 'react-native'

const FullPostScreen = props => {
    return (
        <View style={{justifyContent : 'center', alignItems : 'center'}}>
            <Text>{props.route.params.post.content}</Text>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default FullPostScreen;