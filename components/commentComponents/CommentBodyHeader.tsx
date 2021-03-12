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
        fontSize: 16,
        fontWeight: 'bold'
    },
    info: {
        color: 'grey',
    },
    texts: {
        flexDirection: 'column',
    },
})

export default CommentBodyHeader