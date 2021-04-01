import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TextInput, FlatList } from 'react-native'
import CommentItem from '../../components/commentComponents/CommentItem'
import QuestionItem from '../../components/questionsComponents/QuestionItem'
import { Button } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors'
import axios from 'axios'
import { useSelector } from 'react-redux'
import AnswerFooter from '../../components/questionsComponents/AnswerFooter'
import AnswerItem from '../../components/questionsComponents/AnswerItem'

const FullQuestionScreen = props => {

    const params = props.route.params

    const userId = useSelector(state => {
        return state.auth.userId
    })

    const [answerInput, setAnswerInput] = useState('')

    const [answers, setAnswers] = useState([])

    const submitAnswer = () => {
        const questionId = params.question._id
        axios.post(`http://192.168.0.105:4200/student/university/questions/${questionId}`, {
            content: answerInput,
            answerOwnerId: userId
        })
        setAnswerInput('')
    }

    useEffect(() => {
        axios.get(`http://192.168.0.105:4200/student/university/questions/${params.question._id}`)
            .then(response => {
                setAnswers(response.data.answers)
            })
    })

    return (
        <View style={styles.fullQuestionScreen}>
            <QuestionItem
                isFollowing={props.route.params.isFollowing}
                content={params.question.content}
                ownerName={params.question.ownerId.name}
                ownerImage={params.question.ownerId.imageUrl}
                createdAt={params.question.createdAt}
            />
            <View style={styles.answerInputAndButtonContainer}>
                <TextInput
                    placeholder='Answer...'
                    multiline={true}
                    style={styles.answerInput}
                    value={answerInput}
                    onChangeText={(value) => setAnswerInput(value)}
                />
                {
                    answerInput !== '' &&
                    <Button
                        type="clear"
                        onPress={submitAnswer}
                        icon={
                            <Ionicons
                                name="send"
                                size={24}
                                color={Colors.primary}
                            />
                        }
                    />
                }
            </View>

            <FlatList
                contentContainerStyle={{ padding: 0 }}
                data={answers}
                renderItem={(itemData) => {
                    
                    return (
                        <AnswerItem
                            questionId={params.question._id}
                            answerId={itemData.item._id}
                            userId={userId}
                            questionOwnerId={params.question.ownerId._id}
                            name={itemData.item.ownerId.name}
                            content={itemData.item.content}
                            imageUrl={itemData.item.ownerId.imageUrl}
                            createdAt={itemData.item.createdAt}
                            bestAnswer={itemData.item.bestAnswer}
                            numberOfVotes={itemData.item.votes}
                        >
                        </AnswerItem>
                    )
                }}
                keyExtractor={(item) => item._id}
            />


        </View>
    )
}

const styles = StyleSheet.create({
    fullQuestionScreen: {
        flex: 1,
    },
    answerInputAndButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    answerInput: {
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        borderColor: 'grey',
        marginHorizontal: 5,
        flex: 1
    },
})

export default FullQuestionScreen