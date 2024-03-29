import React, { useEffect } from 'react'
import {View,FlatList,Text, StyleSheet} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {fetchSharingCenterOtherRequests} from '../../../store/middleware/api'
import { RequestMessageItem } from '../components/RequestMessageItem'

const OtherRequestsScreen = props => {
    const dispatch = useDispatch()
    const requests = useSelector(state=> state.sharingCenter.OtherRequests)
    console.log(requests)
    useEffect(() => {
        dispatch(fetchSharingCenterOtherRequests())
    }, [])

    const openItem = (item) => {
        props.navigation.navigate('RequestChatScreen', {
            item : item,
            userImage : item.sender.imageUrl,
            username : `From ${item.sender.name}`
        })
    }

    return (
        <View style={styles.mainContainer}>
            <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={1}
            data={requests}
            renderItem={({item}) => {
                return (
                    <RequestMessageItem
                    onPress={openItem.bind(this, item)}
                    item={item}
                    userImage={item.sender.imageUrl}
                    username={`From ${item.sender.name}`}
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

export default OtherRequestsScreen