import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native'
import ProfileAvatarImage from '../../components/profileComponents/ProfileAvatarImage'
import { AssinuText } from '../../components/UI/AssinuText'
import { Colors } from '../../constants/Colors'
import { Button, colors } from 'react-native-elements'

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
                <View style={styles.coursesStyles}>
                    <Text style={{ color:'black', fontSize:20,paddingTop:10 }}>
                        Courses
                </Text>
                </View>
        </View>
            
       
        
    )
}

const styles = StyleSheet.create({
    upperContainer: {
       // marginTop:15,
        marginLeft:5,
        marginRight: 5,

        //backgroundColor: '#eff0ef',
        height: '40%',
       // borderBottomLeftRadius: 20,
       // borderBottomRightRadius: 20,
        //borderBottomColor:Colors.greyb,
       // borderBottomWidth:5,
       // borderWidth:1,
        borderColor: Colors.greyb,
        //borderTopLeftRadius: 20,
        //borderTopRightRadius: 20,
    

    },
    name: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 16,
        color: 'black',
    },
    bio: {
        color: Colors.greybb
    },
    infoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        //marginBottom: 2
    },
    coursesStyles:{
        width:'100%',
        alignContent:'center',
        alignItems:'center',
        alignSelf:'center',
        //margin:20,
        borderTopWidth:0.5,
        borderColor:Colors.greyb,
       // borderBottomWidth:0.5,


    }
})

export default ProfileHeader