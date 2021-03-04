import React from 'react'
import {View, StyleSheet, Image, Text} from 'react-native'
import {Colors} from '../constants/Colors'

const ProfileHeader = (props) => {
    return(
        <View style={{...styles.profileHeader, ...props.style}}>
            <View style={styles.profileImageContainer}>
                <Image
                style={styles.profileImage}
                source={require('../assets/abdallah.jpg')}
                />
            </View>

            <View>
                <Text style={styles.username}>Abdallah Dereia</Text>
                <Text style={styles.bio}>Computer Engineer, NNU</Text>
            </View>
           
        </View>
    )
}

const styles = StyleSheet.create({
    profileHeader: {
        backgroundColor:Colors.primary,
        alignItems:'center',
        borderBottomLeftRadius:40,
        borderBottomRightRadius:40
    },
    profileImage: {
        width:80,
        height:80,
        borderRadius:40
    },
    profileImageContainer: {
        justifyContent:'center',
        alignItems:'center',
    },
    username: {
        color:'white',
        textAlign:'center',
        fontSize:18,
        fontWeight:'bold'
    },
    bio :{
        color:'white',
        textAlign:'center',
        fontWeight:'normal'
    }
    
})

export default ProfileHeader;