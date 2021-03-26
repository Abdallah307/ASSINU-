import React, { useState, useLayoutEffect } from 'react'
import { View, StyleSheet, Text, ActivityIndicator, TouchableWithoutFeedback, Keyboard } from 'react-native'
import CreatePostHeader from '../../components/postComponents/CreatePostHeader'
import CreatePostInput from '../../components/postComponents/CreatePostInput'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/CustomHeaderButton'
import { Colors } from '../../constants/Colors'
import { CourseGroup } from '../../api/api'
import { useDispatch, useSelector } from 'react-redux'




const CreatePost = props => {

    const [content, setContent] = useState('')
    const params = props.route.params

    const handlePostInput = (value) => {
        setContent(value)
    }

    const createPost = async () => {

        try {
            const groupId = params.groupId
            const ownerId = params.userId
            const response = await CourseGroup.createPost({ 
                groupId:groupId,
                ownerId:ownerId,
                content : content 
            })

            if (response.status === 201) {
                props.navigation.navigate('Group', {
                    postCreated: true
                })
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    useLayoutEffect(() => {
        console.log('created the post')
        props.navigation.setOptions(screenOptions(createPost))
    })


    return (
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()} style={{flex:1}}>
        <View style={styles.createPost}>

            <CreatePostHeader
                username={params.username}
                imageUrl={params.userImage}
            />

            <CreatePostInput
                onChangeText={handlePostInput}
                content={content}
            />

        </View>
        </TouchableWithoutFeedback>
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
        backgroundColor: 'white',
    }
})



export default CreatePost;