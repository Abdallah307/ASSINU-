import React, { useState, useLayoutEffect } from 'react'
import { View, StyleSheet, Text, ActivityIndicator, TouchableWithoutFeedback, Keyboard } from 'react-native'
import CreatePostHeader from '../../components/postComponents/CreatePostHeader'
import CreatePostInput from '../../components/postComponents/CreatePostInput'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/CustomHeaderButton'
import { Colors } from '../../constants/Colors'
import { CourseGroup } from '../../api/api'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker';
import HOST, { SERVER_PORT } from '../../configs/config'



const CreatePost = props => {

    const [content, setContent] = useState('')
    const [image, setImage] = useState(null)
    const [result, setResult] = useState()
    const [isSharing, setIsSharing] = useState(false)

    const chooseImageFromDevice = async () => {
        try {
            let value = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            })

            if (value.cancelled) return

            setImage(value.uri)
            setResult(value)
        }
        catch (err) { }

    }

    const uploadPhotoAsync = async () => {

        setIsSharing(true)

        let localUri = result.uri;
        let filename = localUri.split('/').pop();

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;


        let formData = new FormData();

        formData.append('imageUrl', { uri: localUri, name: filename, type });
        formData.append('groupId', params.groupId)
        formData.append('ownerId', params.userId)
        formData.append('content', content)


        const response = await axios.post(
            `http://${HOST}:${SERVER_PORT}/student/createpost`,
            formData,
            {
                headers: {
                    'content-type': 'multipart/form-data',
                }
            }

        )

        if (response.status === 201) {
            setIsSharing(false)
            props.navigation.navigate('Group', {
                postCreated: true
            })
        }


    }


    const params = props.route.params

    const handlePostInput = (value) => {
        setContent(value)
    }

    const createPost = async () => {

        try {
            const groupId = params.groupId
            const ownerId = params.userId
            const response = await CourseGroup.createPost({
                groupId: groupId,
                ownerId: ownerId,
                content: content
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
        if (!image) {
            props.navigation.setOptions(screenOptions(createPost, content.length))
        }
        else {
            props.navigation.setOptions(screenOptions(uploadPhotoAsync, content.length))
        }
        
    })


    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
            <View style={styles.createPost}>

                <CreatePostHeader
                    chooseImageFromDevice={chooseImageFromDevice}
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

const screenOptions = (createPost, contentLength, isPosting) => ({
    headerRight: () => {
        return (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                { contentLength == 0 ?
                    <Item
                        title="Post"
                        disabled={true}
                        buttonStyle={{
                            backgroundColor: 'lightgrey',
                            padding: 10,
                            color: Colors.primary,
                            borderRadius: 10,

                        }}
                        onPress={createPost}
                    />
                    :
                    <Item
                        title="Post"
                        buttonStyle={{
                            backgroundColor: 'white',
                            padding: 10,
                            color: Colors.primary,
                            borderRadius: 10,

                        }}
                        onPress={createPost}
                    />}
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