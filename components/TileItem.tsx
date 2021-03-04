import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import {Colors} from '../constants/Colors'

const TileItem = (props) => {
    return (
        <TouchableOpacity onPress={props.onSelect} activeOpacity={0.7}>
            <View style={styles.tileItem}>
                <Text style={styles.tileText}>Group</Text>
            </View>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    tileItem: {
        backgroundColor: Colors.primary,
        width: '100%',
        aspectRatio: 3 / 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:20,
        marginVertical:10
    },
    tileText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold'
    }
})

export default TileItem;