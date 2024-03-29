import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import { AntDesign, EvilIcons, Octicons } from '@expo/vector-icons';

const AnswerFooter = props => {

    const [isUpvoter, setIsUpvoter] = useState(props.isUpvoter)
    const [isDownvoter, setIsDownvoter] = useState(props.isDownvoter)

    return (
        <View style={styles.answerFooter}>
            <Button
                onPress={props.upvote}
                titleStyle={styles.buttonTitle}
                type="clear"
                title='Upvote'
                icon={
                    <Octicons
                        name="arrow-up"
                        size={20}
                        color="grey"
                    />
                }
            />

            <Button
                onPress={props.downvote}
                titleStyle={styles.buttonTitle}
                type="clear"
                title='Downvote'
                icon={
                    <Octicons
                        name="arrow-down"
                        size={20}
                        color="grey"
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