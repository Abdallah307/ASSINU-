import React from 'react'
import { View, StyleSheet } from 'react-native'
import PostHeader from '../postComponents/PostHeader'
import AnswerBody from './AnswerBody'
import AnswerFooter from './AnswerFooter'


const AnswerItem = props => {

   
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
            upvote={props.upvote} 
            downvote={props.downvote} 
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