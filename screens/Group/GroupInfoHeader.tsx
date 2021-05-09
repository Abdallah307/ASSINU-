import { AntDesign } from '@expo/vector-icons'
import React, { useState } from 'react'
import { View, StyleSheet, Text, ImageBackground } from 'react-native'
import { Button } from 'react-native-elements'
import { Colors } from '../../constants/Colors'

const GroupInfo = props => {
    return (

        <View style={styles.groupInfo}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                <Text
                    style={styles.groupTitle}
                >
                    {props.title}
                </Text>
                {props.showChattingButton &&
                    <Button
                        onPress={props.openChatting}
                        type="clear"
                        icon={<AntDesign name="message1" size={30} color={Colors.primary} />}
                    />

                }
            </View>


            <Text
                style={styles.membersCount}
            >
                {props.numberOfMembers} Participants
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    groupInfo: {
        backgroundColor: 'white',
        height: 100,
        padding: 10
    },
    groupTitle: {
        fontSize: 22,
        color: Colors.primary,
        fontFamily: 'OpenSans-Bold'
    },
    membersCount: {
        fontSize: 12,
        color: 'black',
        fontFamily: 'OpenSans-Regular'
    }
})

export default GroupInfo;