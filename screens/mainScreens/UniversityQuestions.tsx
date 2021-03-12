import React from 'react'
import {View, StyleSheet, Text} from 'react-native'


const UniversityQuestions = (props) => {
    return(
        <View style={styles.mainView}>
            <Text>UniversityQuestions</Text>
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

export default UniversityQuestions;