import React from 'react'
import { View, FlatList } from 'react-native'

const GroupPostList = props => {
    return (
        <FlatList
            contentContainerStyle={{ paddingBottom: 200 }}
            {...props}
        />
    )
}

export default GroupPostList;