import React from 'react'
import {View, StyleSheet, Text} from 'react-native'
import {Input} from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import {Colors} from '../../constants/Colors'

const SearchInput = props => {
    return(
        <View style={styles.searchInput}>
            <Ionicons name="md-search" size={24} color={Colors.primary} />
            <Text style={styles.placeholder}>Search...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    searchInput: {
        borderWidth:1,
        padding:15,
        borderRadius:50,
        borderColor:'grey',
        flexDirection:'row',
        alignItems:'center'
    },
    placeholder: {
        fontFamily:"OpenSans-Regular",
        color:'grey'
    }
})

export default SearchInput