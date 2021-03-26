import React from 'react'
import {View, StyleSheet, Text} from 'react-native'
import {Input} from 'react-native-elements'

const SearchInput = props => {
    return(
        <View style={styles.searchInput}>
            <Text style={styles.placeholder}>Search...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    searchInput: {
        borderWidth:1,
        padding:15,
        borderRadius:50,
        borderColor:'grey'
    },
    placeholder: {
        fontFamily:"OpenSans-Regular",
        color:'grey'
    }
})

export default SearchInput