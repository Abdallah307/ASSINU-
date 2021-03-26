import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

const CommentBodyHeader = props => {
    return (
        <View style={styles.texts}>
            <Text style={styles.name}>{props.name}</Text>
            <Text style={styles.info}>Computer Engineer</Text>
            <Text style={styles.info}>5h</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    name: {
        fontSize: 14,
        fontFamily:"OpenSans-Bold"
    },
    info: {
        color: 'grey',
        fontFamily:'OpenSans-Light'
    },
    texts: {
        flexDirection: 'column',
    },
})

export default CommentBodyHeader