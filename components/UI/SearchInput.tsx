import React from 'react'
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import { Input } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors'
import { AssinuText } from './AssinuText';

const SearchInput = props => {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={{ padding: 10 }}>
                <View style={styles.searchInput}>
                    <Ionicons name="md-search"
                        size={24}
                        color={Colors.primary}
                    />
                    <AssinuText
                        style={styles.placeholder}
                    >
                        Search...
            </AssinuText>
                </View>
            </View>
        </TouchableWithoutFeedback>

    )
}

const styles = StyleSheet.create({
    searchInput: {
        borderWidth: 1,
        padding: 15,
        borderRadius: 50,
        borderColor: 'grey',
        flexDirection: 'row',
        alignItems: 'center'
    },
    placeholder: {
        fontFamily: "OpenSans-Regular",
        color: 'grey'
    }
})

export default SearchInput