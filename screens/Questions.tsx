import React from 'react'
import {View, StyleSheet, Text} from 'react-native'


const Questions = (props) => {
    return(
        <View style={styles.mainView}>
            <Text>Questions</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center'
    }
})
export default Questions;