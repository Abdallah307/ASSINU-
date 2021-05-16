import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Colors } from '../../constants/Colors'
import Profile from '../Profile/Profile'
import ProfileButtons from '../Profile/ProfileButtons'

const StudentProfile = props => {
    const params = props.route.params
    return (
        <Profile
            profileButtons={<ProfileButtons/>}
            name={params.student.name}
            imageUrl={params.student.imageUrl}
        />
    )
}

export default StudentProfile;