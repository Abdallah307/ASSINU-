import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import PostHeader from '../postComponents/PostHeader'
import AnswerBody from './AnswerBody'
import AnswerFooter from './AnswerFooter'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import axios from 'axios'
import HOST, { SERVER_PORT } from '../../configs/config'
const AnswerItem = props => {

    const userId = useSelector(state => {
        return state.auth.userId
    })

    const answer = props.answer

    const upvoteAnswer = async () => {
        const response = await axios.put(
            `http://${HOST}:${SERVER_PORT}/student/university/questions/answer/upvote/${props.questionId}`,
            {
                answerId: answer._id,
                upvoterId: userId
            }
        )

        if (response.status === 201) {
            props.fetchAnswers()
        }
    }


    const downvoteAnswer = async () => {
        const response = await axios.put(
            `http://${HOST}:${SERVER_PORT}/student/university/questions/answer/downvote/${props.questionId}`,
            {
                answerId: answer._id,
                downvoterId: userId
            }
        )

        if (response.status === 201) {
            props.fetchAnswers()
        }
    }

    
    return (

        <View style={styles.answerItem}>
            <PostHeader
                bestAnswer={props.bestAnswer}
                questionOwnerId={props.questionOwnerId}
                createdAt={answer.createdAt}
                ownerName={answer.ownerId.name}
                imageUrl={answer.ownerId.imageUrl}
            />
            <TouchableOpacity onPress={props.openAnswer} activeOpacity={0.7}>
                <AnswerBody content={answer.content} />
            </TouchableOpacity>
            <AnswerFooter
                openAnswer={props.openAnswer}
                upvote={upvoteAnswer}
                downvote={downvoteAnswer}
                numberOfVotes={answer.votes}
            />
        </View>
    )

}

const styles = StyleSheet.create({
    answerItem: {
        marginVertical: 5
    }
})

export default AnswerItem;