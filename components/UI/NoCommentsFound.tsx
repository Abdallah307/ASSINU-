import React from 'react'
import {View, Image, StyleSheet, Text} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';

const NoCommentsFound = props => {
    return (
        <View style={styles.container}>
            <Image
            resizeMode='center'
            source={require('../../assets/no-comments.png')}
            style={{width:100, height:100}}
            />
            <Text>No Comments yet</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
})

export default NoCommentsFound