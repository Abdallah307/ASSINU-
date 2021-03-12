import React from 'react'
import {View, StyleSheet} from 'react-native'
import PostBody from '../postComponents/PostBody'
import PostHeader from '../postComponents/PostHeader'
import QuestionFooter from './QuestionFooter'

const QuestionItem = props => {


    return(
        <View style={styles.questionItem}>
            <PostHeader imageUrl='images/ali.jpg' ownerName='Muntaser Abu Thaher'/>
            <PostBody content='السلام عليكم.
بدي أسأل عن مكان بنابلس ببيع وصلات USB أصليات لنقل الداتا مش للشحن و كم سعرهم ؟'/>
            <QuestionFooter onAnswerPressed={props.onAnswerPressed}/>
        </View>
    )
}

const styles = StyleSheet.create({
    questionItem: {
        marginVertical:5
    }
})

export default QuestionItem