import React, {useState, useEffect} from 'react'
import {View, FlatList, Text} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ListItem from '../components/ListItem'
import axios from 'axios'
import { Colors } from '../constants/Colors'
import HOST , {API_PORT} from '../configs/config'

import CustomActivityIndicator from '../components/CustomActivityIndicator'

const GroupMembers = (props) => {
    const groupId = props.route.params.groupId
    const [members, setMembers] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    const renderMembers = (itemData) => {
        return <ListItem  title={itemData.item.studentId.name}/>
    }

    useEffect(() => {
        let isCancelled = false
        const fetchMembers = async () => {
            try{
                const result = await axios.get(`http://${HOST}:${API_PORT}/student/course/`+groupId)
                setIsLoaded(true)
                if (!isCancelled) {
                    setMembers(result.data.students)
                }
            }
            catch(err){
                console.log(err)
            }
            
        }

        fetchMembers()
      
        return () => {
            isCancelled = true
        }
        
    })

    if (!isLoaded) 
        return <CustomActivityIndicator/>
        
    

    return(
        <FlatList
        contentContainerStyle={{flex:1}}
        data={members}
        renderItem={renderMembers}
        keyExtractor={(item=>item._id)}
        />
    )

    
}

export default GroupMembers