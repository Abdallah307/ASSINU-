import React from 'react'
import {View, StyleSheet, Text} from 'react-native'


const Feed = (props) => {
    return(
        <View style={styles.mainView}>
            <Text>Feed</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center'
    }
})

export default Feed;