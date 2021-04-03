import React, {useState} from 'react'
import {View, StyleSheet, Text, FlatList} from 'react-native'
import SharedItem from '../../components/sharingCenterComponents/SharedItem'


const SharingCenterPublic = props => {
    const [items, setItems] = useState([
        'Intel processor',
        'cpu kit',
        'arduino uno',
        'risparry pi',
        'Intel processor',
        'cpu kit',
        'arduino uno',
        'risparry pi'
    ])
    return (
        <FlatList
        contentContainerStyle={{paddingBottom:15}}
        numColumns={2}
        data={items}
        renderItem={(itemData) => {
            return (
                <SharedItem itemName={itemData.item}/>
            )
        }}
        keyExtractor={(item, index) => index.toString()}
        />
    )
}

const styles = StyleSheet.create({

})

export default SharingCenterPublic