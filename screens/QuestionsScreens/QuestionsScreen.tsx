import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import FloatingButton from '../../components/UI/FloatingButton'
import SearchInput from '../../components/UI/SearchInput'

const QuestionsScreen = (props: any) => {
    return (
        <View style={{ flex: 1 }}>
            
            <FloatingButton
                size={65}
                onPress={props.onPressFloatingButton}
            />

            <SearchInput onPress={props.onPressSearchInput}/>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({

})

export default QuestionsScreen;