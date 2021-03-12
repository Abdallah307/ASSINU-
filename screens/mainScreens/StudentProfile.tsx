import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, ScrollView, FlatList } from 'react-native'
import ProfileHeader from '../../components/profileComponents/ProfileHeader'
import ListItem from '../../components/UI/ListItem'
import { Colors } from '../../constants/Colors'
import { useSelector, useDispatch } from 'react-redux'
import CustomActivityIndicator from '../../components/UI/CustomActivityIndicator'
import { fetchStudentData } from '../../store/middleware/NajahApi'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/CustomHeaderButton'


const StudentProfile = (props) => {

    const dispatch = useDispatch()

    const [refreshing, setRefresh] = useState(false)

    const userData = useSelector(state => {
        return state.auth
    })

    const studentData = useSelector(state => {
        return state.student
    })



    useEffect(() => {
        let isCancelled = false
        if (!isCancelled) {
            dispatch(fetchStudentData({
                studentEmail: userData.email
            }))
        }



        return () => {
            isCancelled = true
        }

    }, [dispatch,userData.email])



    const openCourseGroup = (itemData) => {
        const item = itemData.item
        props.navigation.navigate('Group', {
            title: item.courseId.name,
            id: item.courseId._id,
            userImage: userData.imageUrl,
            numberOfMembers: item.courseId.students.length,
            userId: userData.userId,
            username:userData.name 
        })

    }

    const renderItems = (itemData) => {
        return <ListItem
            onSelect={() => openCourseGroup(itemData)}
            title={itemData.item.courseId.name}
        />
    }


    return (
        <View style={styles.mainView}>
            <ProfileHeader
                name={userData.name}
                imageUrl={userData.imageUrl}
                bio={studentData.department}
                style={styles.profileHeader}
            />

            <View style={styles.profileBody}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>My Courses</Text>
                </View>
                {
                    !studentData.isLoaded ? <CustomActivityIndicator/>:
                    <FlatList
                    contentContainerStyle={{ padding: 20 }}
                    data={studentData.courses}
                    renderItem={renderItems}
                    keyExtractor={(item) => item._id.toString()}
                    refreshing={refreshing}
                    onRefresh={()=>{}}
                />
                }
                

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
    },
    profileHeader: {
        flex: 3.2
    },
    profileBody: {
        flex: 6
    },
    titleContainer: {
        marginVertical: 10,
        marginHorizontal: 20
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.secondary
    }
})

export default StudentProfile;