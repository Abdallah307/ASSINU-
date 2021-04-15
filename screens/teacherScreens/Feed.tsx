import React from 'react'
import {View, StyleSheet, Text} from 'react-native'

const Feed = (props: any) => {
    return (
        <View style={styles.feed}>
            <Text>Feed</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    feed: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default Feed;