import React from 'react'
import {View, Image, StyleSheet, Text} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

interface Props {
    style?: object,
    imageStyle?: object,
    titleStyle?: object,
    title ?: string,
    image : any 
}

const NotFound = (props:Props) => {
    return (
        <View style={styles.container}>
            <Image
            resizeMode='center'
            source={props.image}
            style={{...styles.imageStyle, ...props.style}}
            />
            <Text
             
             style={{...styles.titleStyle, ...props.titleStyle}}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor : 'white'
    },
    imageStyle : {
        width : 100,
        height : 100
    },
    titleStyle : {
        color:Colors.primary,
        fontFamily:"OpenSans-Bold",
        fontSize : 18,
        maxWidth : '100%',
        textAlign : 'center'
    }
})

export default NotFound