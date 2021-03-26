import React from 'react'
import { View,TouchableWithoutFeedback, Text, StyleSheet, ScrollView, ImageBackground, Image, TextInput } from 'react-native'
import { Button } from 'react-native-elements'
import ProfileAvatarImage from '../profileComponents/ProfileAvatarImage'


const WritePost = (props: any) => {
    return (
        <View style={styles.mainView}>
            <ProfileAvatarImage style={styles.avatarImage} imageUrl={props.imageUrl}/>
            <TouchableWithoutFeedback onPress={props.onTouch}>
                <View style={styles.inputView}>
                    <Text style={styles.inputPlaceHolder}>Write Something...</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView:{
        marginVertical:15,
        flexDirection:'row',
        padding:20,
        backgroundColor:'white'
    },
   
    inputView:{
        justifyContent:'center',
        borderWidth:0.9,
        borderRadius:100,
        width:'80%',
        paddingLeft:15,
        borderColor:'#ccc'
    },
    postInput:{
        borderWidth:1,
        padding:10,
        borderRadius:20,
        
    },
    inputPlaceHolder:{
        color:'#ccc',
        fontFamily:'OpenSans-Regular'
    },
    avatarImage: {
        width:50,
        height:50,
        borderRadius:25,
        marginRight:10
    }
})

export default WritePost