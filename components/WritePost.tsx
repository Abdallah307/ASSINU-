import React from 'react'
import { View,TouchableWithoutFeedback, Text, StyleSheet, ScrollView, ImageBackground, Image, TextInput } from 'react-native'
import ProfileAvatarImage from './ProfileAvatarImage'


const WritePost = (props: any) => {
    return (
        <View style={styles.mainView}>
            <ProfileAvatarImage/>
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
        borderWidth:1.2,
        borderRadius:20,
        width:'80%',
        paddingLeft:10,
        borderColor:'#ccc'
    },
    postInput:{
        borderWidth:1,
        padding:10,
        borderRadius:20,
    },
    inputPlaceHolder:{
        color:'#ccc',
        fontWeight:'bold'
    }
})

export default WritePost