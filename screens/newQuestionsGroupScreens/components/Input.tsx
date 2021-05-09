import React from 'react'
import {View, TextInput, StyleSheet} from 'react-native'
import {Button} from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';

const Input = props => {
    return (
        <View style={styles.inputView}>
            <TextInput
            multiline={true}
            placeholder={props.placeholder || 'Write...'}
            style={{...styles.input, width:props.value.length !== 0 ? '85%':'100%'}}
            value={props.value}
            onChangeText={props.onChangeText}
            />
            {props.value.length !== 0 && <Button
            type='clear'
            icon={<Ionicons name="ios-send" size={25} color="black" />}
            containerStyle={{backgroundColor:'lightgrey',width:"15%", justifyContent:'center', alignItems:'center'}}
            buttonStyle={{width:'100%', height:'100%'}}
            onPress={props.onPressButton}
            />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    inputView : {
        backgroundColor : 'white',
        position : 'absolute',
        bottom : 0,
        width : '100%',
        flexDirection:'row',
        alignItems:'center'
    },
    input : {
        width : '85%',
        padding: 15,
        backgroundColor:"lightgrey",
    }
})

export default Input