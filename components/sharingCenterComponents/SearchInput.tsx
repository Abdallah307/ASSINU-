import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Input} from 'react-native-elements'
import { EvilIcons } from '@expo/vector-icons';

const SearchInput = (props:any) => {
    return (
        <Input
            placeholder='Search for items'
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            leftIcon={<EvilIcons name="search" size={24} color="black" />}
            value={props.value}
            onChangeText={(value) => props.searchForItems(value)} 
        />        
    )
}

const styles = StyleSheet.create({
    inputContainerStyle: {
        borderWidth:1,
        marginVertical:10,
        borderRadius:15,
        width:'100%',
        paddingHorizontal:10
    },
    inputStyle: {
        padding:0,
    }
})

export default SearchInput