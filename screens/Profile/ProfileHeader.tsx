import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native'
import ProfileAvatarImage from '../../components/profileComponents/ProfileAvatarImage'
import { AssinuText } from '../../components/UI/AssinuText'
import { Colors } from '../../constants/Colors'
import { Button } from 'react-native-elements'

const ProfileHeader = props => {
    return (
        <View style={styles.upperContainer}>
            <View style={styles.infoContainer}>
                <TouchableOpacity onPress={props.onPressUserImage} onLongPress={props.onLongPressUserImage}>
                    <ProfileAvatarImage
                        imageUrl={props.imageUrl}
                        style={{ width: 80, height: 80, borderRadius: 40 }}
                    />
                </TouchableOpacity>
                <AssinuText style={styles.name}>{props.name}</AssinuText>
                <AssinuText style={styles.bio}>{props.bio}</AssinuText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    upperContainer: {
        backgroundColor: Colors.primary,
        height: '40%',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    name: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 16,
        color: 'white'
    },
    bio: {
        color: '#eeeeee'
    },
    infoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginBottom: 10
    }
})

export default ProfileHeader