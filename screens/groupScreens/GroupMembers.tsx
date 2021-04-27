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

    const userId = useSelector(state => state.auth.userId)

    useEffect(() => {

        let isCancelled = false
        const fetchMembers = async () => {
            try {
                const result = await CourseGroup.fetchGroupMembers(groupId)
                setIsLoaded(true)
                if (!isCancelled) {
                    setMembers(result.data.members)
                }
            }
            catch (err) {
                console.log(err)
            }

        }

        fetchMembers()

        return () => {
            isCancelled = true
        }

    }, [])

    const renderMembers = (itemData: any) => {
        return (
            <MemberItem
                openStudentProfile={() => {
                    if (itemData.item._id === userId) {
                        props.navigation.navigate('Profile')
                    }
                    else
                        props.navigation.navigate('StudentProfile', {
                            student: itemData.item
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