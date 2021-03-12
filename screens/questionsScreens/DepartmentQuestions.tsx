import React from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import QuestionItem from '../../components/questionsComponents/QuestionItem'
import FloatingButton from '../../components/UI/FloatingButton'

const DepartmentQuestions = (props) => {

    const onAnswerPressed = () => {
        props.navigation.navigate('FullQuestionScreen')
    }

    return(
        <View style={{flex:1}}>
        <FloatingButton style={styles.floatingButton}/>
        <ScrollView style={styles.mainView}>
            <QuestionItem onAnswerPressed={onAnswerPressed}/>
            <QuestionItem/>
            <QuestionItem/>
            <QuestionItem/>
            <QuestionItem/>
        </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
       
    },
    floatingButton: {
       bottom:50,
       right:15,
       zIndex:1,
        
    }
})

export default DepartmentQuestions;