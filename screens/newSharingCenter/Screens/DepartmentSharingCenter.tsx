import React, {useEffect} from 'react'
import {View,FlatList,Text, StyleSheet} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {fetchDepartmentSharedItems} from '../../../store/middleware/api'
import ShopItem from '../components/ShopItem'

const DepartmentSharingCenter = props => {
    const dispatch = useDispatch()
    const items = useSelector(state=> state.sharingCenter.departmentItems)

    useEffect(() => {
        dispatch(fetchDepartmentSharedItems())
    }, [])

    const openItem = (item) => {
        props.navigation.navigate('ItemDetailsScreen', {
            item : item
        })
    }


    return (
        <View style={styles.mainContainer}>
           <FlatList
            numColumns={2}
            data={items}
            renderItem={({item}) => {
                return (
                    <ShopItem
                    onPress={openItem.bind(this, item)}
                    imageUrl={item.imageUrl}
                    title={item.title}
                    price={item.price}
                    />
                )
            }}
            keyExtractor={(item) => item._id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer : {
        flex : 1,
    }
})

export default DepartmentSharingCenter