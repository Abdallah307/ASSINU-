import React, { useState, useEffect } from 'react'
import { ScrollView, Text , View, Modal, FlatList } from 'react-native'
import QuestionItem from '../../components/questionsComponents/QuestionItem'
import FloatingButton from '../../components/UI/FloatingButton'
import AddQuestionsModal from './AddQuestionModal'
import axios from 'axios'
import { useSelector } from 'react-redux'

const DepartmentQuestions = (props) => {
    return (
        <View style={{flex: 1,justifyContent:'center', alignItems:'center'}}>
            <Text>DepartmentQuestions</Text>
        </View>
    )
}

export default DepartmentQuestions;