import React from 'react'
import {View, Image, StyleSheet, Text} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';

const NotFound = props => {
    return (
        <View style={styles.container}>
            <Image
            resizeMode='center'
            source={props.image}
            style={{width:100, height:100}}
            />
            <Text>{props.title}</Text>
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

export default NotFound