import React from 'react'
import {View , Text , StyleSheet , Image} from 'react-native'
import HOST from '../../configs/config'
import {Colors} from '../../constants/Colors';

const ProfileAvatarImage = (props: any)  => {
    let uri;
    if (props.imageUrl == '') {
        uri = 'https://images.pexels.com/photos/2312369/pexels-photo-2312369.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
    }
    else uri = `http://${HOST}:4200/${props.imageUrl}`
    return(
        <Image
        style={{...styles.profileImage, ...props.style}}
        source={{
            uri:uri,
        }}
    />
    )
}

const styles = StyleSheet.create({
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 10,
        marginRight: 5,
        borderWidth: 1,
        borderColor: Colors.pur3,
    },
    
})

export default ProfileAvatarImage;