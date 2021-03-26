import React, {useState} from 'react'
import { View, StyleSheet } from 'react-native'
import { Button , Icon} from 'react-native-elements'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors'
const QuestionFooter = props => {

    
    return (
        <View style={styles.questionFooter}>
            <Button
                onPress={props.onAnswerPressed}
                buttonStyle={styles.answerButton}
                titleStyle={styles.answerButtonTitle}
                title='Answer'
                type='clear'
                icon={<MaterialIcons name="question-answer" size={15} color="grey" />}
            />

            <Button
                onPress={props.onFollowPressed}
                buttonStyle={styles.answerButton}
                titleStyle={styles.answerButtonTitle}
                title= {props.isFollowing ? 'Following' : 'Follow'}
                titleStyle={props.isFollowing ? {color:Colors.primary} : {color:'grey'}}
                type='clear'
                icon={
                    <MaterialCommunityIcons 
                    name="signal-variant" 
                    size={15} 
                    color={props.isFollowing ? Colors.primary: 'grey'} 
                    />
                }
            />

        </View>
    )
}

const styles = StyleSheet.create({
    questionFooter: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor:'white'
    },
    answerButtonTitle: {
        color: 'grey',
        marginLeft: 5
    },
    answerButton: {
    }
})

export default QuestionFooter