import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, FlatList } from 'react-native'
import { Colors } from '../../constants/Colors'
import ListItem from '../../components/UI/ListItem'
import CustomActivityIndicator from '../../components/UI/CustomActivityIndicator'
import { fetchStudentData } from '../../store/middleware/NajahApi'
import { useSelector, useDispatch } from 'react-redux'


const StudentCourses = props => {

    const [refreshing, setRefresh] = useState(false)

    const dispatch = useDispatch()

    const userData = useSelector(state => {
        return state.auth
    })

    const studentData = useSelector(state => {
        return state.student
    })






    const openCourseGroup = (itemData) => {
        const item = itemData.item
        props.navigation.navigate('Group', {
            title: item.courseId.name,
            id: item.courseId._id,
            userImage: userData.imageUrl,
            numberOfMembers: item.courseId.students.length,
            userId: userData.userId,
            username: userData.name
        })

    }




    const renderItems = (itemData) => {
        return <ListItem
            onSelect={() => openCourseGroup(itemData)}
            title={itemData.item.courseId.name}
        />
    }

    return (
        <>
            {
                !studentData.isLoaded ? <CustomActivityIndicator /> :
                    <FlatList
                        numColumns={2}
                        contentContainerStyle={{ padding: 20 }}
                        data={studentData.courses}
                        renderItem={renderItems}
                        keyExtractor={(item) => item._id.toString()}
                        refreshing={refreshing}
                        onRefresh={() => { }}
                    />
            }
        </>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        marginVertical: 10,
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        color: 'white',
        backgroundColor: Colors.primary,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontFamily: 'OpenSans-Bold'

    }
})

export default StudentCourses