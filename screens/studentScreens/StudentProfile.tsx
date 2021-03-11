import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, ScrollView, FlatList } from 'react-native'
import ProfileHeader from '../ProfileHeader'
import ListItem from '../../components/ListItem'
import { Colors } from '../../constants/Colors'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { actions as studentActions } from '../../store/student'
import HOST from '../../configs/config'
import CustomActivityIndicator from '../../components/CustomActivityIndicator'
import { fetchStudentData } from '../../store/middleware/NajahApi'
import {io} from 'socket.io-client'

const StudentProfile = (props) => {

    const dispatch = useDispatch()

    const [refreshing, setRefresh] = useState(false)

    const userData = useSelector(state => {
        return state.auth
    })

    const studentData = useSelector(state => {
        return state.student
    })



    useEffect(() => {
        let isCancelled = false
        if (!isCancelled) {
            dispatch(fetchStudentData({
                studentEmail: userData.email
            }))
        }



        return () => {
            isCancelled = true
        }

    }, [dispatch,userData.email])



    const renderItems = (itemData) => {
        return <ListItem
            onSelect={() => openCourseGroup(itemData)}
            title={itemData.item.courseId.name}
        />
    }

    const openCourseGroup = (itemData) => {
        props.navigation.navigate('Group', {
            title: itemData.item.courseId.name,
            id: itemData.item.courseId._id,
            userImage: userData.imageUrl,
            numberOfMembers: itemData.item.courseId.students.length,
            userId: userData.userId,
            username:userData.name 
        })

    }


    return (
        <View style={styles.mainView}>
            <ProfileHeader
                name={userData.name}
                imageUrl={userData.imageUrl}
                bio={studentData.department}
                style={styles.profileHeader}
            />

            <View style={styles.profileBody}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>My Courses</Text>
                </View>
                {
                    !studentData.isLoaded ? <CustomActivityIndicator/>:
                    <FlatList
                    contentContainerStyle={{ padding: 20 }}
                    data={studentData.courses}
                    renderItem={renderItems}
                    keyExtractor={(item) => item._id.toString()}
                    refreshing={refreshing}
                    onRefresh={()=>{}}
                />
                }
                

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
        marginHorizontal: 20
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.secondary
    }
})

export default StudentProfile;