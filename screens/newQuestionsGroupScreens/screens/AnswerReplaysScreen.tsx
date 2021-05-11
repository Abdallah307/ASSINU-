import axios from 'axios'
import React, {useState, useEffect} from 'react'
import {View, StyleSheet, Text, FlatList, Keyboard} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import HOST, { SERVER_PORT } from '../../../configs/config'
import Input from '../components/Input'
import {actions as replayActions} from '../../../store/replay'
import CommentItem from '../../../components/commentComponents/CommentItem'
import {actions as commentsActions} from '../../../store/comment'

const AnswersReplayScreen = props => {

    const [inputValue ,setInputValue] = useState('')

    const dispatch = useDispatch()

    const groupName = props.route.params.groupName

    const {token} = useSelector(state=> state.auth)

    const replays = useSelector(state => state.replays.replays)

    const submitReplay = async () => {
        try {
            setInputValue('')
            Keyboard.dismiss()
            const response = await axios.post(
                `http://${HOST}:${SERVER_PORT}/${groupName}/questions/answers/comments/replays/addreplay`,{
                    comment : props.route.params.comment._id,
                    content : inputValue 
                },
                {
                    headers : {
                        Authorization : `Bearer ${token}`
                    }
                }
            )

            if (response.status === 201) {
                dispatch(replayActions.CREATE_REPLAY({
                    replay : response.data.replay 
                }))

                dispatch(commentsActions.INCREMENT_NUMBER_OF_REPLAYS({
                    commentId : props.route.params.comment._id 
                }))
            }
        }
        catch(err) {
            console.log(err)
        }
    }

    const fetchReplays = async () => {
        try {
            const commentId = props.route.params.comment._id
            const response = await axios.get(
                `http://${HOST}:${SERVER_PORT}/${groupName}/questions/answers/comments/${commentId}/replays`,{
                    headers : {
                        Authorization : `Bearer ${token}`
                    }
                }
            )

            if (response.status === 200) {
                dispatch(replayActions.SET_REPLAYS({
                    replays : response.data.replays
                }))
            }
        }
        catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        dispatch(replayActions.CLEAR_REPLAYS({}))
        fetchReplays()
    }, [])

    return (
        <>
        <FlatList
        contentContainerStyle={{paddingBottom : 200}}
        ListHeaderComponent={() => {
            return (
                <>
                <CommentItem
                imageUrl={props.route.params.comment.owner.imageUrl}
                content={props.route.params.comment.content}
                createdAt={props.route.params.comment.createdAt}
                name={props.route.params.comment.owner.name}
                />
                <Text style={{fontSize : 20}}>Replays</Text>
                </>
            )
        }}
        data={replays}
        renderItem={({item}) => {
            return (
                <CommentItem
                imageUrl={item.owner.imageUrl}
                content={item.content}
                createdAt={item.createdAt}
                name={item.owner.name}
                />
            )
        }}
        keyExtractor={(item) => item._id}
        />
        <Input
        value={inputValue}
        onChangeText={(value) => setInputValue(value)}
        onPressButton={submitReplay}
        />
        </>
    )
}

const styles = StyleSheet.create({

})

export default AnswersReplayScreen;