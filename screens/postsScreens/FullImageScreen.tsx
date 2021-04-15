import React from 'react'
import {View, StyleSheet, Image} from 'react-native'
import HOST, { SERVER_PORT } from '../../configs/config'

const FullImageScreen = props => {

    return (
        <View style={styles.fullImageContainer}>
            <Image
            source={{
                uri:`http://${HOST}:${SERVER_PORT}/${props.route.params.imageUrl}`
            }}
            style={styles.image}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    fullImageContainer: {
        flex:1,
        backgroundColor:'black',
        justifyContent:'center',
        alignItems:'center'
    },
    image: {
        width:'100%',
        aspectRatio: 4 / 3
    }
})

export default FullImageScreen