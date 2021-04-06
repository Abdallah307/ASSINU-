import React, {useState} from 'react'
import {
    View,
    ImageBackground,
    StyleSheet,
} from 'react-native'
import {Button} from 'react-native-elements'
import { Colors } from '../../constants/Colors'

const ImageHeader = props => {

    return (
        <View style={{ width: '100%', aspectRatio: 4 / 3 }}>
            <ImageBackground
            resizeMode='cover'
                source={
                    props.image === undefined ? require('../../assets/no-image.png') : 
                    {
                        uri:props.image 
                    }
                }
                style={styles.choosenImage}
            >
                {props.children}
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    
    choosenImage: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
})

export default ImageHeader