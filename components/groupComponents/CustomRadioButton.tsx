import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { RadioButton } from 'react-native-paper';
import { Colors } from '../../constants/Colors';

const CustomRadioButton = props => {
    return (
        <View style={styles.radioButtonContainer}>
            <RadioButton
                disabled={props.disabled}
                color={Colors.primary}
                value={props.choice._id}
            />
            <View style={{ width: '100%' }}>
                <Text style={styles.content}>{props.choice.choiceContent}</Text>
                <TouchableOpacity onPress={props.openVotersListScreen}>
                    <Text>{props.choice.numberOfVotes} votes</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    radioButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        padding: 15,
    },
    content: {
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 5,
        width: '80%',
        paddingHorizontal: 10,
        paddingVertical: 15
    }
})

export default CustomRadioButton;