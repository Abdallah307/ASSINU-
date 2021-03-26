import React from 'react'
import {
    View,
    StyleSheet,
    SafeAreaView,
    TextInput,
    StatusBar,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native'
import { Button } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';

const SearchScreen = props => {
    return (
        <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
            <View style={styles.searchContainer}>
                <SafeAreaView style={styles.header}>
                    <Button 
                        onPress={()=> props.navigation.goBack()}
                        containerStyle={{ width: '15%' }}
                        buttonStyle={{ borderRadius: 50 }}
                        type='clear'
                        icon={<Ionicons name="arrow-back" size={24} color="black" />}
                    />
                    <TextInput
                        autoFocus
                        style={styles.searchInput}
                        placeholder="Search question..."
                    />
                </SafeAreaView>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    searchContainer: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        height: 60,
        backgroundColor: '#aaaaaa',
        alignItems: 'center',
        marginTop: StatusBar.currentHeight
    },
    searchInput: {
        width: '85%',
        height: '100%',
        paddingHorizontal: 10
    }
})

export default SearchScreen;