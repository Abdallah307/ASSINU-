import React from 'react'
import {View, StyleSheet} from 'react-native'
import PostBody from '../postComponents/PostBody'
import PostHeader from '../postComponents/PostHeader'
import QuestionFooter from './QuestionFooter'

const QuestionItem = props => {
    
    return(
        <View style={styles.questionItem}>
            <PostHeader 
            createdAt={props.createdAt} 
            imageUrl={props.ownerImage} ownerName={props.ownerName}/>
            <PostBody onOpenPost={props.onOpenQuestion} content={props.content}/>
            <QuestionFooter 
            isFollowing={props.isFollowing} 
            onFollowPressed={props.onFollowPressed} 
            onAnswerPressed={props.onOpenQuestion}
            numberOfAnswers={0}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    questionItem: {
        marginVertical:5,
    }
})

export default QuestionItem