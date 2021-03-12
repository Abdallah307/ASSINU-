import React, { useState, useLayoutEffect } from 'react'
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native'
import CreatePostHeader from '../../components/CreatePostHeader'
import CreatePostInput from '../../components/CreatePostInput'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/CustomHeaderButton'
import { Colors } from '../../constants/Colors'
import { CourseGroup } from '../../api/api'
import { useDispatch, useSelector } from 'react-redux'




const CreatePost = props => {

    const [content, setContent] = useState<string>('')
    const [isPostCreated, setIsPostCreated] = useState(false)
    const dispatch = useDispatch()

    const params = props.route.params

    const handlePostInput = (value: string) => {
        setContent(value)
    }

    const createPost = async () => {

        setIsPostCreated(false)

        try {
            const groupId = params.groupId
            const ownerId = params.userId

            const response = await CourseGroup.createPost({ groupId, ownerId, content })

            if (response.status === 201) {
                props.navigation.navigate('Group')
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    useLayoutEffect(() => {
        props.navigation.setOptions(screenOptions(createPost))
    })


    return (
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