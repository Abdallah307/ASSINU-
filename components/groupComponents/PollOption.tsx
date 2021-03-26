import React from 'react'
import {View, StyleSheet, Text} from 'react-native'
import {Colors} from '../../constants/Colors'

const PollOption = props => {

    return (
        <View style={styles.pollOption}>
            <Text style={styles.optionText}>{props.value}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    pollOption : {
        marginVertical:10,
        padding:10,
        backgroundColor: Colors.primary,
        borderRadius:10
    },
    optionText: {
        fontFamily:'OpenSans-Bold',
        color: 'white'
    }
})

export default PollOption