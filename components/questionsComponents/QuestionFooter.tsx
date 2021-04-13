import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableNativeFeedback } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import { MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors'
const QuestionFooter = props => {

    const [isF , setIsF] = useState(props.isFollowing)

    return (
        <View style={styles.questionFooter}>
            <Button
                onPress={props.onAnswerPressed}
                buttonStyle={styles.answerButton}
                titleStyle={styles.answerButtonTitle}
                title='Answer'
                type='clear'
                icon={<Ionicons name="ios-create-outline" size={20} color={Colors.prussianBlue} />}
            />

            <Button
                onPress={() => {
                    props.onFollowPressed()
                    setIsF(!isF)
                }}
                buttonStyle={styles.answerButton}
                titleStyle={styles.answerButtonTitle}
                title={isF ? 'Following' : 'Follow'}
                titleStyle={isF ? { color: Colors.primary, fontFamily:'OpenSans-Regular' } : { color: 'grey' ,fontFamily:'OpenSans-Regular'}}
                type='clear'
                icon={
                    <MaterialCommunityIcons
                        name="signal-variant"
                        size={20}
                        color={isF ? Colors.primary : 'grey'}
                    />
                }
            />
            <TouchableNativeFeedback onPress={props.onAnswerPressed}>
                <Text
                    style={styles.numberOfAnswersText}>
                    {props.numberOfAnswers} Answers
            </Text>
            </TouchableNativeFeedback>

        </View>
    )
}

const styles = StyleSheet.create({
    questionFooter: {
        borderTopWidth: 0.2,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    answerButtonTitle: {
        color: Colors.prussianBlue,
        marginLeft: 5,
        fontFamily:'OpenSans-Regular'
    },
    answerButton: {
    },
    numberOfAnswersText: {
        fontFamily: 'OpenSans-Regular',
        marginLeft: 'auto'
    }
})

export default QuestionFooter