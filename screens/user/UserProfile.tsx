import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, ScrollView, FlatList } from 'react-native'
import ProfileHeader from '../../components/profileComponents/ProfileHeader'
import { Colors } from '../../constants/Colors'
import { useSelector, useDispatch } from 'react-redux'
import { fetchStudentData } from '../../store/middleware/NajahApi'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/CustomHeaderButton'
import UserProfileNavigator from './UserProfileNavigator'
import Profile from '../Profile/Profile'
import ProfileButtons from '../Profile/ProfileButtons'
import StudentCourses from './StudentCourses'
import { AssinuText } from '../../components/UI/AssinuText'

const StudentUserProfile = (props) => {



    const userData = useSelector(state => {
        return state.auth
    })

    const studentData = useSelector(state => {
        return state.student
    })



    return (

        <Profile
            imageUrl={userData.imageUrl}
            name={userData.name}
            bio={studentData.department.name}
        >
            <StudentCourses navigation={props.navigation} />
        </Profile>

    )
}

export const options = ({ route, navigation }) => ({
    headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
                title="List"
                iconName='list'
                onPress={() => navigation.openDrawer()}
            />
        </HeaderButtons>
    )
})


export default StudentUserProfile;