import React, {useState, useEffect} from 'react'
import {View, StyleSheet, Text} from 'react-native'
import { Button } from 'react-native-elements'
import { useSelector } from 'react-redux'
import GroupHeader from '../../components/groupComponents/GroupHeader'
import WritePost from '../../components/postComponents/WritePost'

const DepartmentGroup = props => {
    const [GroupPosts, setGroupPosts] = useState([])

    const department = useSelector(state=> {
        return state.teacher.departmentId
    })

    const user = useSelector(state=> {
        return state.auth
    })

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
                        onPress={openGroupMembers}
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
                        onPress={() => props.navigation.navigate("Poll", {
                            groupId: params.id,
                            userImage: params.userImage,
                            userId: params.userId,
                            username: params.username
                        })}
                        buttonStyle={{
                            backgroundColor: 'transparent',
                            borderWidth: 1
                        }}
                    />
                </View>

                <WritePost
                    imageUrl={user.imageUrl}
                   // onTouch={openCreatePost}
                />
            </>
        )
    }

    return (
        <View>
           <GroupHeaderComponent/>
           <Text>hala</Text>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default DepartmentGroup