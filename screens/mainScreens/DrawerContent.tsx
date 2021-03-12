import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Colors } from '../../constants/Colors'

import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer'
import ProfileAvatarImage from '../../components/ProfileAvatarImage'
import {
    AntDesign,
    FontAwesome,
    Feather,
    MaterialIcons
} from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux'
import {actions as authActions} from '../../store/auth'

const DrawerContent = (props) => {

    const dispatch = useDispatch()

    const user = useSelector(state => {
        const { imageUrl, name } = state.auth
        return {
            imageUrl,
            name
        }
    })

    const studentBio = useSelector(state => {
        return state.student.bio
    })

    return (
        <DrawerContentScrollView  {...props}>
            <View style={{ flex: 1 }}>
                <View style={styles.userInfo}>
                    <ProfileAvatarImage imageUrl={user.imageUrl} style={styles.userImage} />
                    <View>
                        <Text style={styles.username}>{user.name}</Text>
                        <Text style={styles.bio}>dummy bio</Text>
                    </View>
                </View>
            </View>
            <DrawerItem
                icon={() => <AntDesign name="home" size={24} color="black" />}
                onPress={() => props.navigation.navigate('Feed')}
                label="Home"
            />

            <DrawerItem
                icon={() => <FontAwesome name="user-o" size={24} color="black" />}
                onPress={() => props.navigation.navigate('StudentProfile')}
                label="Profile"
            />

            <DrawerItem
                icon={() => <FontAwesome name="university" size={24} color="black" />}
                onPress={() => props.navigation.navigate('UniversityQuestions')}
                label="Ask University"
            />

            <DrawerItem
                icon={() => <MaterialIcons name="question-answer" size={24} color="black" />}
                onPress={() => props.navigation.navigate('DepartmentQuestions')}
                label="Ask Department"
            />

            <DrawerItem
                icon={() => <FontAwesome name="exchange" size={24} color="black" />}
                onPress={() => {props.navigation.navigate('SharingCenter') }}
                label="Sharing Center"
            />

            <DrawerItem
                style={{ borderBottomWidth: 0.6 }}
                icon={() => <Feather name="settings" size={24} color="black" />}
                onPress={() => { }}
                label="Settings"
            />

            <DrawerItem
                icon={() => <MaterialIcons name="logout" size={24} color="black" />}
                onPress={() => {dispatch(authActions.signout({}))}}
                label="Logout"
            />
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        paddingBottom: 50,
        borderBottomWidth: 0.8,
        paddingHorizontal: 20,
        borderColor: 'grey',
        backgroundColor: Colors.primary
    },
    username: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 50,

    },
    bio: {
        fontSize: 11,
        color: 'white',
        fontWeight: 'bold'
    }
})

export default DrawerContent