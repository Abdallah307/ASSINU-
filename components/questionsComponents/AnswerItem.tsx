import React from 'react'
import { View, StyleSheet } from 'react-native'
import PostHeader from '../postComponents/PostHeader'
import AnswerBody from './AnswerBody'
import AnswerFooter from './AnswerFooter'
import {useDispatch} from 'react-redux' 
import {upvoteAnswer, downvoteAnswer} from '../../store/middleware/api'

const AnswerItem = props => {
    const dispatch = useDispatch()

    const upvote = () => {
        dispatch(upvoteAnswer({
            questionId:props.questionId,
            answerId:props.answerId,
            upvoterId: props.userId
        }))
    }

    const downvote = () => {
        dispatch(downvoteAnswer({
            questionId:props.questionId,
            answerId:props.answerId,
            downvoterId: props.userId
        }))
    }
    return (
        <View style={styles.answerItem}>
            <PostHeader
                bestAnswer={props.bestAnswer}
                questionOwnerId={props.questionOwnerId}
                createdAt={props.createdAt}
                ownerName={props.name}
                imageUrl={props.imageUrl}
            />
            <AnswerBody content={props.content} />
            <AnswerFooter 
            upvote={upvote} 
            downvote={downvote} 
            numberOfVotes={props.numberOfVotes} 
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