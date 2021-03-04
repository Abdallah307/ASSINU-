import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'


const ListItem = (props) => {
    return (
        <TouchableOpacity onPress={props.onSelect} activeOpacity={0.7}>
            <View style={styles.listItem}>
                <Text style={styles.listItemTitle}>{props.title}</Text>
            </View>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    listItem: {
        marginVertical: 5,
        padding: 20,
        alignItems: 'center',
        width:'100%',
        backgroundColor:'#4961da',
        borderRadius:10
        
    },
    listItemTitle: {
        color:'white',
        fontSize:16,
        fontWeight:'bold'
    }
})

export default ListItem