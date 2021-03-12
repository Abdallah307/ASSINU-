import React, { useState, useEffect } from 'react'
import {FlatList} from 'react-native'
import ListItem from '../../components/ListItem'
import { CourseGroup } from '../../api/api'
import CustomActivityIndicator from '../../components/CustomActivityIndicator'

const GroupMembers = (props:any) => {
    const groupId = props.route.params.groupId
    const [members, setMembers] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)


    useEffect(() => {

        let isCancelled = false
        const fetchMembers = async () => {
            try {
                const result = await CourseGroup.fetchGroupMembers(groupId)
                setIsLoaded(true)
                if (!isCancelled) {
                    setMembers(result.data.students)
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

    })

    if (!isLoaded)
        return <CustomActivityIndicator />



    return (
        <FlatList
            contentContainerStyle={{ flex: 1 }}
            data={members}
            renderItem={renderMembers}
            keyExtractor={((item:any) => item._id)}
        />
    )


}

const renderMembers = (itemData:any) => {
    return <ListItem title={itemData.item.studentId.name} />
}

export default GroupMembers