import React, { useEffect } from 'react'
import {View,FlatList,Text, StyleSheet} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {fetchSharingCenterMyRequests} from '../../../store/middleware/api'
import { RequestMessageItem } from '../components/RequestMessageItem'

const MyRequestsScreen = props => {
    const dispatch = useDispatch()
    const requests = useSelector(state=> state.sharingCenter.myRequests)
    console.log(requests)
    useEffect(() => {
        dispatch(fetchSharingCenterMyRequests())
    }, [])

    const openItem = (item) => {
        props.navigation.navigate('RequestChatScreen', {
            item : item,
            userImage : item.receiver.imageUrl,
            username : `To ${item.receiver.name}`
        })
    }

    return (
        <View style={styles.mainContainer}>
            <FlatList
            numColumns={1}
            data={requests}
            renderItem={({item}) => {
                return (
                    <RequestMessageItem
                    onPress={openItem.bind(this, item)}
                    item={item}
                    userImage={item.receiver.imageUrl}
                    username={`To ${item.receiver.name}`}
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
        padding : 20
    }
})


export default MyRequestsScreen