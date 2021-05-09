import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import SharedItem from '../../components/sharingCenterComponents/SharedItem'
import axios from 'axios'
import HOST, { SERVER_PORT } from '../../configs/config'
import { useSelector } from 'react-redux'
import { SwipeItem,SwipeButtonsContainer } from 'react-native-swipe-item'



const MyItemsScreen = props => {

    const [myItems, setMyItems] = useState([])

    const {userId, token} = useSelector(state => {
        return state.auth
    })

    const fetchItems = async (isCancelled: boolean) => {
        try {
            const response = await axios.get(
                `http://${HOST}:${SERVER_PORT}/sharingcenter/myitems/${userId}`
            , {
                headers: {
                    'Authorization':'Bearer ' + token
                }
            })

            if (response.status === 200) {
                if (!isCancelled) {
                    setMyItems(response.data.items)
                }
            }

        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        let isCancelled: boolean = false
        console.log('my items')
        fetchItems(isCancelled)

        return () => {
            isCancelled = true
        }

    }, [])

    
    return (
        <View style={{backgroundColor:'white', flex:1}}>
        <FlatList
            data={myItems}
            numColumns={2}
            contentContainerStyle={{ paddingBottom: 15, backgroundColor: 'white' }}
            renderItem={(itemData) => {
                return (
                        <SharedItem
                            imageUrl={itemData.item.imageUrl}
                            itemName={itemData.item.name}
                            openDetails={() => props.navigation.navigate('ItemDetailsScreen', {
                                item: itemData.item
                            })}
                            onLongPress={() => {}}
                        />
                )
            }}
            keyExtractor={(item, index) => index.toString()}
        />
        </View>
    )
}

const styles = StyleSheet.create({

})

export default MyItemsScreen