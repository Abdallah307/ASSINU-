import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { useSelector } from 'react-redux'
import { CourseGroup } from '../../api/api'
import GroupHeader from '../../components/groupComponents/GroupHeader'
import PostItem from '../../components/postComponents/PostItem'
import WritePost from '../../components/postComponents/WritePost'
import CustomActivityIndicator from '../../components/UI/CustomActivityIndicator'
import { Colors } from '../../constants/Colors'

const DepartmentGroup = props => {
    const [GroupPosts, setGroupPosts] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    const department = useSelector(state => {
        return state.teacher.department
    })

    const user = useSelector(state => {
        return state.auth
    })


    useEffect(() => {
        let isCancelled = false
        const fetchGroupPosts = async () => {
            console.log('fetch group posts')
            try {
                const groupId = department._id
                const response = await CourseGroup.fetchPosts(groupId)

                if (response.status === 200) {
                    setIsLoaded(true)
                    if (!isCancelled)
                        setGroupPosts(response.data.posts)
                }

            }
            catch (err) {
                console.log(err.message)
            }
        }

        fetchGroupPosts()
        return () => {
            isCancelled = true
        }
    }, [])


    const openCreatePost = () => {
        props.navigation.navigate('CreatePost', {
            groupId: department._id,
            userImage: user.imageUrl,
            userId: user.userId,
            username: user.name,
            navScreen:'DepartmentGroup'
        })
    }

    useEffect(() => {
        if (props.route.params?.post) {
            let posts = [...GroupPosts]
            posts.unshift(props.route.params.post)
            setGroupPosts(posts)
        }
    }, [props.route.params?.post])

    const GroupHeaderComponent = () => {
        return (
            <>
                <GroupHeader
                    numberOfMembers={30}
                    title={department.name}

                />
                <View style={{ flexDirection: 'row', flex: 1, backgroundColor: 'white' }}>
                    <Button
                        containerStyle={{ flex: 1, marginHorizontal: 5 }}
                        title='Participants'
                        // onPress={openGroupMembers}
                        titleStyle={{
                            color: Colors.blueGreen
                        }}
                        buttonStyle={{
                            backgroundColor: 'transparent',
                            borderWidth: 1
                        }}
                    />
                    <Button
                        title='Create poll'
                        titleStyle={{
                            color: Colors.blueGreen
                        }}
                        containerStyle={{ flex: 1, marginHorizontal: 5 }}
                        // onPress={() => props.navigation.navigate("Poll", {
                        //     groupId: params.id,
                        //     userImage: params.userImage,
                        //     userId: params.userId,
                        //     username: params.username
                        // })}
                        buttonStyle={{
                            backgroundColor: 'transparent',
                            borderWidth: 1
                        }}
                    />
                </View>

                <WritePost
                    imageUrl={user.imageUrl}
                    onTouch={openCreatePost}
                />
            </>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            { !isLoaded ? <CustomActivityIndicator /> :
                <FlatList
                    ListHeaderComponent={<GroupHeaderComponent />}
                    data={GroupPosts}
                    renderItem={(itemData) => {
                        const post = itemData.item
                        let imageUrl;
                        try { imageUrl = post.imageUrl } catch (err) { imageUrl = null }

                        return (
                            <PostItem
                                navigation={props.navigation}
                                imageUrl={imageUrl}
                                post={post}
                            />
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />}
        </View>
    )
}

const styles = StyleSheet.create({

})

export default DepartmentGroup