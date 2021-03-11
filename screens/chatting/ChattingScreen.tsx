import React, { useState, useEffect } from 'react'
import { View, FlatList, StyleSheet, TextInput } from 'react-native'
import ChattingMessage from './ChattingMessage'
import { Colors } from '../../constants/Colors'
import {Button} from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';

const ChattingScreen = props => {
    const [messages, setMessages] = useState([
        "hello iam here man",
        'shit what the hell'
    ])

    const [message, setMessage] = useState('')

    return (
        <View style={styles.chattingScreen}>
            <FlatList
                data={messages}
                renderItem={(itemData) => {
                    return (
                        <ChattingMessage messageContent={itemData.item} />
                    )
                }}
            />
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <TextInput
                    value={message}
                    onChangeText={(value)=>setMessage(value)}
                    style={styles.inputStyle}
                    placeholder="Type a message.."
                />
               { message.length!== 0 && <Button
               onPress={()=> {
                setMessages([...messages, message])
                setMessage('')
               }}
                type="clear"
                icon={<Ionicons  name="send" size={24} color={Colors.primary} />}
                />
                }
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    chattingScreen: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white'
    },
    inputStyle: {
        backgroundColor: '#eeeeee',
        paddingHorizontal: 15,
        borderRadius: 30,
        paddingVertical: 10,
        flex:1
    }

})

export default ChattingScreen