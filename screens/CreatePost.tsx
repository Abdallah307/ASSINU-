import React, {useState, useLayoutEffect} from 'react'
import {View, StyleSheet, Text} from 'react-native'
import CreatePostHeader from '../components/CreatePostHeader'
import CreatePostInput from '../components/CreatePostInput'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../components/CustomHeaderButton'

import {Colors} from '../constants/Colors'

import {useDispatch} from 'react-redux'

import {actions as postActions} from '../store/Posts'

const CreatePost = props =>  {
    const [content, setContent] = useState<string>('')

    const dispatch = useDispatch()
    
    const handlePostInput = (value:string) => {
        setContent(value)
    }

    useLayoutEffect(() => {
        props.navigation.setOptions({
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
                            onPress={()=>{
                                dispatch(postActions.addPost({
                                    id:'c11',
                                    groupId: props.route.params.groupId,
                                    content: content,
                                    ownerId:'u1' 
                                }))
                                props.navigation.navigate('Group')
                            }}
                        />
                    </HeaderButtons>
                )
            }
        })
    })
    
        
    return(
        <View style={styles.createPost}>
            <CreatePostHeader imageUrl={props.route.params.userImage}/>
            <CreatePostInput onChangeText={handlePostInput} content={content}/>
        </View>
    )
}

const styles = StyleSheet.create({
    createPost: {
        flex:1,
    }
})



export default CreatePost;