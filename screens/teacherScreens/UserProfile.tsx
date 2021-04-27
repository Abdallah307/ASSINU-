import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import ProfileHeader from '../../components/profileComponents/ProfileHeader'
import { useSelector } from 'react-redux'
import TeacherCourses from './TeacherCourses'
import TeacherProfileNavigator from './TeacherProfileNavigator'
import Profile from '../Profile/Profile'

const UserProfile = (props: any) => {
    const teacherData = useSelector(state => {
        return state.auth
    })
    return (

        <Profile
            imageUrl={teacherData.imageUrl}
            name={teacherData.name}
        >
            <TeacherCourses navigation={props.navigation} />
        </Profile>

    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: 'white'
    },
    profileHeader: {
        flex: 3.2
    },
    profileBody: {
        flex: 6
    },

})

export default UserProfile