import React from 'react'
import {View, Image, StyleSheet} from 'react-native'

const NoResultFound = props => {
    return (
        <View style={styles.container}>
            <Image
            resizeMode='center'
            source={require('../../assets/no-results.png')}
            />
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

export default NoResultFound