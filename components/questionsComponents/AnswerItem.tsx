import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
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
            <View style={{padding:5}}>
                <Text>{answer.numberOfUpvotes} Upovtes {answer.numberOfDownvotes} Downvotes</Text>
            </View>
            <AnswerFooter
                openAnswer={props.openAnswer}
                upvote={props.upvoteAnswer}
                downvote={props.downvoteAnswer}
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