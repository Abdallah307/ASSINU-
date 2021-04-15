import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import ProfileHeader from '../../components/profileComponents/ProfileHeader'
import { useSelector } from 'react-redux'
import TeacherCourses from './TeacherCourses'
import TeacherProfileNavigator from './TeacherProfileNavigator'

const UserProfile = (props: any) => {
    const teacherData = useSelector(state => {
        return state.auth
    })
    return (
        <View style={styles.mainView}>
            <ProfileHeader
                imageUrl={teacherData.imageUrl}
                name={teacherData.name}
                bio={teacherData.bio}
                style={styles.profileHeader}
            />
            <View style={styles.profileBody}>
                <TeacherProfileNavigator />
            </View>
        </View>
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