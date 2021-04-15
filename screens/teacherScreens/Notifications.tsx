import React from 'react'
import {View, StyleSheet, Text} from 'react-native'

const Notifications = (props: any) => {
    return (
        <View style={styles.Notifications}>
            <Text>Notifications</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    Notifications: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default Notifications