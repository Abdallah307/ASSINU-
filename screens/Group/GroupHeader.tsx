import React, { useState } from 'react'
import { View, StyleSheet, Text, ImageBackground } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Colors } from '../../constants/Colors'
import { Button } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons';
import { useSelector } from 'react-redux'
import GroupCoverImage from './GroupCoverImage'
import GroupInfo from './GroupInfoHeader'

const GroupHeader = (props: any) => {
    return (
        <View style={styles.groupHeader}>

            <GroupCoverImage />
            <GroupInfo
                showChattingButton={props.showChattingButton}
                openChatting={props.openChatting}
                title={props.title}
                numberOfMembers={props.numberOfMembers}
            />
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    groupHeader: {
        backgroundColor: 'white'
    },
    backgroundImage: {
        width: "100%",
        aspectRatio: 2 / 1
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    groupInfo: {
        backgroundColor: 'white',
        height: 100,
        padding: 10
    },
    groupTitle: {
        fontSize: 22,
        color: 'black',
        fontFamily: 'OpenSans-Regular'
    },
    membersCount: {
        fontSize: 12,
        color: 'black',
        fontFamily: 'OpenSans-Regular'
    }
})

export default GroupHeader;
