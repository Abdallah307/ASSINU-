import React from 'react'
import {View,StyleSheet, Image } from 'react-native'

const ProfileImage = props => {
    return(
        <View style={styles.profileImageContainer}>
                <Image
                style={{...styles.profileImage, ...props.style}}
                source={require('../assets/abdallah.jpg')}
                />
            </View>
    )
}

const styles = StyleSheet.create({
    profileImage: {
        width:80,
        height:80,
        borderRadius:40
    },
    profileImageContainer: {
        justifyContent:'center',
        alignItems:'center',
    },
})

export default ProfileImage;