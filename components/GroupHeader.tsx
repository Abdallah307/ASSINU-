import React from 'react'
import { View, StyleSheet, Text, ImageBackground } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Colors } from '../constants/Colors'

const GroupHeader = props => {
    return (
        <View style={styles.groupHeader}>
            <View>
                <ImageBackground
                    style={styles.backgroundImage}
                    source={require('../assets/groupImage.jpg')}
                />
            </View>
            <TouchableOpacity activeOpacity={0.7} onPress={props.openGroupMembers}>
                <View style={styles.groupInfo}>
                    <Text style={styles.groupTitle}>{props.title}</Text>
                    <Text style={styles.membersCount}>{props.numberOfMembers} members</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    groupHeader: {

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
        fontWeight: 'bold',
        fontSize: 30,
        color: Colors.primary
    },
    membersCount: {
        fontSize: 12,
        color: '#ccc'
    }
})

export default GroupHeader;
