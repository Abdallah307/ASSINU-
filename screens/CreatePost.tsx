import React, { useState, useLayoutEffect } from 'react'
import { View, StyleSheet, Text ,ActivityIndicator} from 'react-native'
import CreatePostHeader from '../components/CreatePostHeader'
import CreatePostInput from '../components/CreatePostInput'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../components/CustomHeaderButton'
import HOST, {SERVER_PORT} from '../configs/config'
import { Colors } from '../constants/Colors'

import { useDispatch, useSelector } from 'react-redux'

import { actions as postActions } from '../store/Posts'
import axios from 'axios'

const CreatePost = props => {
    const [content, setContent] = useState<string>('')

    const [isPostCreated , setIsPostCreated] = useState(false)

    const dispatch = useDispatch()

    const user

    const handlePostInput = (value: string) => {
        setContent(value)
    }

    const createPost = () => {
        setIsPostCreated(false)
        axios.request({
            url: `http://${HOST}:${SERVER_PORT}/student/createpost`,
            method: 'post',
            data: {
                groupId: props.route.params.groupId,
                content: content,
                ownerId: props.route.params.userId,
            },
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(result => {
                props.navigation.navigate('Group')
            }).catch(err => {
                console.log(err)
            })
    }

    useLayoutEffect(() => {
        props.navigation.setOptions(screenOptions(createPost))
    })


    return (
        <View style={styles.createPost}>
            <CreatePostHeader username={props.route.params.username} imageUrl={props.route.params.userImage} />
            <CreatePostInput onChangeText={handlePostInput} content={content} />
        </View>
    )
}

const screenOptions = (createPost) => ({
    headerRight: () => {
        return (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Post"
                    buttonStyle={{
                        backgroundColor: 'white',
                        padding: 10,
                        color: Colors.primary,
                        borderRadius: 10,

                    }}
                    onPress={createPost}
                />
            </HeaderButtons>
        )
    }
})

const styles = StyleSheet.create({
    createPost: {
        flex: 1,
    }
})



export default CreatePost;