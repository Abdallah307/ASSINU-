import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import { AntDesign, EvilIcons, Octicons } from '@expo/vector-icons';
import {Colors} from '../../../constants/Colors'

const AnswerFooter = props => {


    return (
        <View style={styles.answerFooter}>
            <Button
                onPress={props.upvoteAnswer}
                titleStyle={{...styles.buttonTitle, color : props.isUpvoted ? Colors.primary : 'grey'}}
                type="clear"
                title='Upvote'
                icon={
                    <Octicons
                        name="arrow-up"
                        size={20}
                        color={props.isUpvoted ? Colors.primary : 'grey'}
                    />
                }
            />

            <Button
                onPress={props.downvoteAnswer}
                titleStyle={{...styles.buttonTitle, color : props.isDownvoted ? Colors.primary : 'grey'}}
                type="clear"
                title='Downvote'
                icon={
                    <Octicons
                        name="arrow-down"
                        size={20}
                        color={props.isDownvoted ? Colors.primary : 'grey'}
                    />
                }
            />

            <Button
                onPress={props.openAnswer}
                titleStyle={styles.buttonTitle}
                type="clear"
                title='Discussion'
                icon={<Octicons name="comment-discussion" size={20} color="grey" />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    answerFooter: {
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center'
    },
    buttonTitle: {
        marginHorizontal: 5,
        fontFamily: 'OpenSans-Regular',
        fontSize: 14,
        color: 'grey'
    }
})

export default AnswerFooter;