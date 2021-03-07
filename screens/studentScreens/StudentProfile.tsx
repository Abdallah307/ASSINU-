import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, ScrollView, FlatList } from 'react-native'
import ProfileHeader from '../ProfileHeader'
import ListItem from '../../components/ListItem'
import {Colors} from '../../constants/Colors'
import {useSelector, useDispatch} from 'react-redux'
import {GROUPS} from '../../data/dummy-data'
import axios from 'axios'
import {actions as studentActions} from '../../store/student'
import HOST from '../../configs/config'

const StudentProfile = (props) => {
    //const groups = GROUPS

    const dispatch = useDispatch()

    const userData = useSelector(state => {
        return state.auth
    })

    

    const [studentData, setStudentData] = useState({})

    useEffect(() => {
        axios.get(`http://${HOST}:9002/student/info/a.dereia@stu.najah.edu`)
        .then(result=> {
            setStudentData(result.data)
        }).
        catch(err=> {
            console.log(err)
        })

        // return () => {
        //     setStudentData({})
        // }
    })



    const renderItems = (itemData) => {
        return <ListItem  
        onSelect={()=> openCourseGroup(itemData)} 
        title={itemData.item.name} 
        />
    }

    const openCourseGroup = (itemData) => {
        props.navigation.navigate('Group', {
            title:itemData.item.name,
            id:itemData.item.id ,
            userImage: userData.imageUrl
        })
        
    }


    return (
        <View style={styles.mainView}>
            <ProfileHeader 
            name={userData.name}
            imageUrl={userData.imageUrl}
            bio = {studentData.department} 
            style={styles.profileHeader} 
            />

            <View style={styles.profileBody}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>My Courses</Text>
                </View>
                <FlatList
                    contentContainerStyle={{padding:20}}
                    data={studentData.courses}
                    renderItem={renderItems}
                    keyExtractor={(item)=>item._id.toString()}
                />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
    profileHeader: {
        flex: 3.2
    },
    profileBody: {
        flex: 6
    },
    titleContainer: {
        marginVertical: 10,
        marginHorizontal:20
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.secondary
    }
})

export default StudentProfile;