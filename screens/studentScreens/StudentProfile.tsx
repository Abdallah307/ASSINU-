import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, ScrollView, FlatList } from 'react-native'
import ProfileHeader from '../ProfileHeader'
import ListItem from '../../components/ListItem'
import {Colors} from '../../constants/Colors'
import {useSelector} from 'react-redux'
import {GROUPS} from '../../data/dummy-data'



const StudentProfile = (props) => {
    const groups = GROUPS

    const renderItems = (itemData) => {
        return <ListItem  
        onSelect={()=> openCourseGroup(itemData)} 
        title={itemData.item.name} 
        />
    }

    const openCourseGroup = (itemData) => {
        props.navigation.navigate('Group', {
            title:itemData.item.name,
            id:itemData.item.id 
        })
        
    }


    return (
        <View style={styles.mainView}>
            <ProfileHeader style={styles.profileHeader} />
            <View style={styles.profileBody}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>My Courses</Text>
                </View>
                <FlatList
                    contentContainerStyle={{padding:20}}
                    data={groups}
                    renderItem={renderItems}
                    keyExtractor={(item)=>item.id.toString()}
                />

            </View>
        </View>
    )
}

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
        marginHorizontal:20
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.secondary
    }
})

export default StudentProfile;