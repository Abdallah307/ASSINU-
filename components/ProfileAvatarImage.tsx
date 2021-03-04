import React from 'react'
import {View , Text , StyleSheet , Image} from 'react-native'

const ProfileAvatarImage = (props: any)  => {
    return(
        <Image
        style={{...styles.profileImage, ...props.style}}
        source={require('../assets/abdallah.jpg')}
    />
    )
}

const styles = StyleSheet.create({
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 10,
        marginRight: 5
    },
    
})

export default ProfileAvatarImage;