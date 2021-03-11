import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import {Button} from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors'


const ChattingInput = (props) => {
    return (
        <View style={styles.mainView}>
            <TextInput
                value={props.value}
                onChangeText={(value) => props.onChangeText(value)}
                style={styles.inputStyle}
                placeholder="Type a message.."
            />
            { props.value.length !== 0 &&
                <Button
                    onPress={props.onSend}
                    type="clear"
                    icon={<Ionicons name="send" size={24} color={Colors.primary} />}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputStyle: {
        backgroundColor: '#eeeeee',
        paddingHorizontal: 15,
        borderRadius: 30,
        paddingVertical: 10,
        flex: 1
    }
})

export default ChattingInput