import axios from 'axios'
import React, {useState} from 'react'
import {View, StyleSheet,FlatList, Text} from 'react-native'
import { useSelector } from 'react-redux'
import HOST, { SERVER_PORT } from '../../../configs/config'
import Body from '../components/Body'
import Header from '../components/Header'
import Input from '../components/Input'

const FullAnswerScreen = props => {
    const answer = props.route.params.answer  
    const [inputValue ,setInputValue] = useState('')

    const [comments , setComments] = useState([])

    const {token} = useSelector(state=> state.auth)

    const fetchAnswerComments = () => {
        try {
            const answerId = answer._id
            const response = axios.get(
                `http://${HOST}:${SERVER_PORT}/${props.groupName}/questions/answer/${answerId}/comments`,{
                    headers : {
                        Authorization : `Bearer ${token}`
                    }
                }
            )

            if (response.status === 200) {
                setComments(response.data.comments)
            }
        }
        catch(err) {

        }
    }


    return (
        <View style={styles.mainContainer}>
            <Header
            name={answer.owner.name}
            imageUrl={answer.owner.imageUrl}
            date={answer.createdAt}
            />
            <Body
            content={answer.content}
            />
            <Input
            value={inputValue}
            onChangeText={(value) => setInputValue(value)}
            onPressButton={() => {}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer : {
        flex : 1,
        backgroundColor : 'yellow'
    }
})

export default FullAnswerScreen;