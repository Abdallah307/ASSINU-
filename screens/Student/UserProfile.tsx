import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Colors } from '../../constants/Colors'
import Profile from '../Profile/Profile'
import ProfileButtons from '../Profile/ProfileButtons'

const StudentProfile = props => {
    const params = props.route.params

    const openCreateAskQuestionScreen = () => {
        props.navigation.navigate('CreateAskQuestionScreen', {
            student : params.user 
        })
    }

    return (
        <Profile
            profileButtons={
            <ProfileButtons
            openCreateAskQuestionScreen={openCreateAskQuestionScreen}
            />
        }
            name={params.user.name}
            imageUrl={params.user.imageUrl}
        />
    )
}

export default StudentProfile;