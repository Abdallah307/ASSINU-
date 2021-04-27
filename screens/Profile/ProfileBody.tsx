import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native'
import ProfileAvatarImage from '../../components/profileComponents/ProfileAvatarImage'
import { AssinuText } from '../../components/UI/AssinuText'
import { Colors } from '../../constants/Colors'
import { Button } from 'react-native-elements'
import { AntDesign, Entypo } from '@expo/vector-icons';

const ProfileBody = props => {
    return (
        <View style={styles.profileBody}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    profileBody: {
        flex: 1,
        marginTop: 10
    },
})

export default ProfileBody;