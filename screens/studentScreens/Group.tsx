import React from 'react'
import {View, StyleSheet, Text, ScrollView} from 'react-native'
import GroupHeader from '../../components/GroupHeader'
import PostItem from '../../components/PostItem'
import WritePost from '../../components/WritePost'
import {useSelector} from 'react-redux'

const Group = (props) => {

    const GroupPosts = useSelector(state=> {
        const posts =  state.posts.posts.filter(p=>{
            return p.groupId === props.route.params.id 
        })

        return posts
    })



    const openCreatePost = () => {
        props.navigation.navigate('CreatePost', {
            groupId: props.route.params.id 
        })
    }

    const openPost = (postId) => {
        props.navigation.navigate('FullPost', {
            postId: postId,
            groupId:props.route.params.id 
        })
    }

    return(
        <ScrollView style={styles.group}>
            <GroupHeader title={props.route.params.title}/>
            <WritePost onTouch={openCreatePost}/>
            {
                GroupPosts.map(post=> {
                    return <PostItem  key={post.id} onOpenPost={()=> openPost(post.id)} content={post.content}/>
                })
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    group: {
        backgroundColor:'lightgrey',
        flex:1,
    }
})  

export default Group;