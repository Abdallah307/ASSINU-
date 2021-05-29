import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { View, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import HOST, { SERVER_PORT } from '../../configs/config'
import { Colors } from '../../constants/Colors'
import Profile from '../Profile/Profile'
import ProfileButtons from '../Profile/ProfileButtons'
import CommonCourses from '../user/CommonCourses'
import StudentCourses from '../user/StudentCourses'

const OtherUserProfile = props => {
    const params = props.route.params

    const [commonCourses, setCommonCourses] = useState([])

    const {courses} = useSelector(state => state.auth)

    const openCreateAskQuestionScreen = () => {
        props.navigation.navigate('CreateAskQuestionScreen', {
            student : params.user 
        })
    }

    const getCommonCourses = () => {
       const commonCourses = courses.filter(course => {
           return course.students.some(student => {
               return student.studentId.email.toString() == params.user.email.toString() 
           })
       })

       setCommonCourses(commonCourses)
    }

    useEffect(() => {
        getCommonCourses()
    }, [params.user._id])

    

    const openCreateMessage = () => {
        props.navigation.navigate('CreateMessageScreen', {
            user : params.user
        })
    }

    return (
        <Profile
            profileButtons={
            <ProfileButtons
            createNewMessage={openCreateMessage}
            showAskButton={params.user.myAsk}
            openCreateAskQuestionScreen={openCreateAskQuestionScreen}
            />
        }
            name={params.user.name}
            imageUrl={params.user.imageUrl}
        >
            <CommonCourses user={params.user} courses={commonCourses} navigation={props.navigation} />
            </Profile>
    )
}

export default OtherUserProfile;