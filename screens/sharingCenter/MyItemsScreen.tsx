import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import SharedItem from '../../components/sharingCenterComponents/SharedItem'

const MyItemsScreen = props => {

    const [myItems, setMyItems] = useState([])

    return (
        <FlatList
            data={myItems}
            renderItem={(itemData) => {
                return (
                    <SharedItem 
                        imageUrl={itemData.item.imageUrl}
                        itemName={itemData.item.name}
                        openDetails={() => props.navigation.navigate('ItemDetailsScreen',{
                            item:itemData.item
                        })}
                    />
                )
            }}
        />
    )
}

const styles = StyleSheet.create({

})

export default MyItemsScreen