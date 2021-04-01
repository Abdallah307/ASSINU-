import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import { AntDesign,EvilIcons,Octicons } from '@expo/vector-icons';

const AnswerFooter = props => {
    return (
        <View style={styles.answerFooter}>
            <Button
                onPress={props.upvote}
                titleStyle={styles.buttonTitle}
                type="clear"
                title='Upvote'
                icon={<Octicons name="arrow-up" size={20} color="black" />}
            />

            <Button
                onPress={props.downvote}
                titleStyle={styles.buttonTitle}
                type="clear"
                title='Downvote'
                icon={<Octicons name="arrow-down" size={20} color="black" />}
            />

            <Button
                titleStyle={styles.buttonTitle}
                type="clear"
                title='Comment'
                icon={<EvilIcons name="comment" size={24} color="black" />}
            />
            <Text>{props.numberOfVotes}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    answerFooter: {
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems:'center'
    },
    buttonTitle: {
        marginHorizontal: 5,
        fontFamily: 'OpenSans-Regular',
        fontSize: 14
    }
})

export default AnswerFooter;