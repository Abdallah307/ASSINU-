import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Colors } from '../../constants/Colors'
import ProfileAvatarImage from './ProfileAvatarImage'
import { Button } from 'react-native-elements'

const ProfileHeader = (props: any) => {

    return (
        <View
            style={
                { ...styles.profileHeader, ...props.style }
            }
        >

            <TouchableOpacity
                onLongPress={() => console.log('Long pressed')}
            >
                <ProfileAvatarImage
                    imageUrl={props.imageUrl}
                    style={styles.profileImage}
                />

            </TouchableOpacity>

            <View>
                <Text style={styles.username}>{props.name}</Text>
                <Text style={styles.bio}>{props.bio}</Text>
            </View>
            {props.children}
        </View>

    )
}

const styles = StyleSheet.create({
    profileHeader: {
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40
    },
    profileImageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    username: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'OpenSans-Bold'
    },
    bio: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'normal',
        fontFamily: 'OpenSans-Regular'
    }

})

export default ProfileHeader;