import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Button, Input } from 'react-native-elements'

const CustomInput = (props:any) => {
    return (
        <Input {...props} inputContainerStyle={{borderColor:'transparent'}} inputStyle={styles.CustomInput}/>
    )
}

const styles = StyleSheet.create({
    CustomInput: {
        borderWidth: 1,
        borderRadius: 20,
        padding: 10
    }


})

export default CustomInput