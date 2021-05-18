import React, { useState, useEffect } from 'react'
import { FlatList, View } from 'react-native'
import ListItem from '../../components/UI/ListItem'
import { CourseGroup } from '../../api/api'
import CustomActivityIndicator from '../../components/UI/CustomActivityIndicator'
import MemberItem from '../../components/UI/MemberItem'
import { useSelector } from 'react-redux'

const GroupMembers = (props: any) => {
    const groupId = props.route.params.groupId
    const [members, setMembers] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    const {userId, token} = useSelector(state => state.auth)

    useEffect(() => {

        let isCancelled = false
        const fetchMembers = async () => {
            try {
                
                const result = await CourseGroup.fetchGroupMembers(groupId, token)
                setIsLoaded(true)
                if (!isCancelled) {
                    console.log(result.data.members)
                    setMembers(result.data.members)
                }
            }
            catch (err) {
                console.log(err)
            }

        }
        if (!props.route.params.groupMembers) {
            fetchMembers()
        }
        else {
            setMembers(props.route.params.groupMembers)
            setIsLoaded(true)
        }
        

        return () => {
            isCancelled = true
        }

    }, [])

    const renderMembers = (itemData: any) => {
        return (
            <MemberItem
                openStudentProfile={() => {
                    if (itemData.item._id === userId) {
                        props.navigation.navigate('UserProfileNavigator')
                    }
                    else
                        props.navigation.navigate('StudentProfile', {
                            user: itemData.item
                        })
                }}
                name={itemData.item.name}
                imageUrl={itemData.item.imageUrl}
            />
        )
    }

    if (!isLoaded)
        return <CustomActivityIndicator />



    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <FlatList
                data={members}
                renderItem={renderMembers}
                keyExtractor={((item: any) => item._id)}
            />
        </View>
    )


}



export default GroupMembers