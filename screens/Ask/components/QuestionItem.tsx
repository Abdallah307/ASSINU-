import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { Colors } from '../../../constants/Colors'
import { MaterialIcons } from '@expo/vector-icons';
import { Button } from 'react-native-elements'
import ProfileAvatarImage from '../../../components/profileComponents/ProfileAvatarImage';
const QuestionItem = props => {
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={props.openQuestion}>
            {props.children}
            <View style={styles.questionItem}>

                <Text
                    style={styles.questionText}
                    numberOfLines={3}
                    ellipsizeMode='tail'
                >
                    Q: {props.questionText}
                </Text>
                {props.isAnswered && <Button
                    type='clear'
                    icon={<MaterialIcons name="verified" size={24} color={Colors.primary} />}
                />}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    questionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderLeftWidth: 15,
        borderColor: Colors.primary,
        backgroundColor: Colors.prussianBlue,
        width: '100%',
        padding: 20,
        marginVertical: 20,
        borderRadius: 10,
    },
    questionText: {
        color: 'white',
        fontFamily: 'OpenSans-Bold',
        flex: 1
    }
})

export default QuestionItem;