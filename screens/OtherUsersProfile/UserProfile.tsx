import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Colors } from '../../constants/Colors'
import Profile from '../Profile/Profile'
import ProfileButtons from '../Profile/ProfileButtons'

const OtherUserProfile = props => {
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
            showAskButton={params.user.myAsk}
            openCreateAskQuestionScreen={openCreateAskQuestionScreen}
            />
        }
            name={params.user.name}
            imageUrl={params.user.imageUrl}
        />
    )
}

export default OtherUserProfile;