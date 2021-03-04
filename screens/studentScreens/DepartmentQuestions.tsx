import React from 'react'
import {View, StyleSheet, Text} from 'react-native'


const DepartmentQuestions = (props) => {
    return(
        <View style={styles.mainView}>
            <Text>DepartmentQuestions</Text>
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

export default DepartmentQuestions;