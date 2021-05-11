import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import Body from './Body'
import Header from './Header'
import AnswerFooter from './AnswerFooter'
import { AssinuText } from '../../../components/UI/AssinuText'

const AnswerItem = props => {
    return(
        <View style={styles.answerItem}>
            <Header
            name={props.answer.owner.name}
            imageUrl={props.answer.owner.imageUrl}
            date={props.answer.createdAt}
            />
            <Body
            onPress={props.onPress}
            content={props.answer.content}
            />
            <View style={{flexDirection: 'row', justifyContent : 'space-around'}}>
                <AssinuText>
                    {props.answer.numberOfDownvotes} Downvotes
                </AssinuText>
                <AssinuText>
                    {props.answer.numberOfUpvotes} Upvotes
                </AssinuText>
            </View>
            <AnswerFooter
            isUpvoted={props.isUpvoted}
            isDownvoted={props.isDownvoted}
            upvoteAnswer={props.upvoteAnswer}
            downvoteAnswer={props.downvoteAnswer}
            />
        </View>
    ) 
}

const styles = StyleSheet.create({
    answerItem : {
        marginBottom : 10,
        backgroundColor : 'white'
    }
})

export default AnswerItem;