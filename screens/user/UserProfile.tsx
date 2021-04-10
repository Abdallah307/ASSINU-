import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, ScrollView, FlatList } from 'react-native'
import ProfileHeader from '../../components/profileComponents/ProfileHeader'
import { Colors } from '../../constants/Colors'
import { useSelector, useDispatch } from 'react-redux'
import { fetchStudentData } from '../../store/middleware/NajahApi'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/CustomHeaderButton'
import UserProfileNavigator from './UserProfileNavigator'
const StudentProfile = (props) => {

    

    const userData = useSelector(state => {
        return state.auth
    })

    const studentData = useSelector(state => {
        return state.student
    })


    return (
        <View style={styles.mainView}>
            <ProfileHeader
                name={userData.name}
                imageUrl={userData.imageUrl}
                bio={studentData.department.departmentName}
                style={styles.profileHeader}
            />

            <View style={styles.profileBody}>
                <UserProfileNavigator/>
            </View>
        </View>
    )
}

export const options = ({route, navigation}) => ({
    headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
            title="List"
            iconName='list'
            onPress={()=> navigation.openDrawer()}            
            />
        </HeaderButtons>
    )
})

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

export default StudentProfile;