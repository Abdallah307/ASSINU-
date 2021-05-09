import React from 'react'
import { View, StyleSheet, FlatList, Text } from 'react-native'
import GroupHeader from './GroupHeader'
import GroupPostList from './GroupPostsList'

const GroupScreen = props => {
    return (
        <>
            <GroupPostList
                {...props}
            />
        </>
    )
}

const styles = StyleSheet.create({

})

export default GroupScreen

