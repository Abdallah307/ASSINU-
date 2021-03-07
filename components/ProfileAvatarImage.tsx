import React from 'react'
import {View , Text , StyleSheet , Image} from 'react-native'
import HOST from '../configs/config'

const ProfileAvatarImage = (props: any)  => {
    return(
        <Image
        style={{...styles.profileImage, ...props.style}}
        source={{
            uri:`http://${HOST}:4200/${props.imageUrl}`,
        }}
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