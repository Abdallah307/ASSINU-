import React, { useEffect } from 'react'
import {View,FlatList,Text, StyleSheet} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import NotFound from '../../../components/UI/NotFound'
import {fetchSharingCenterMyRequests} from '../../../store/middleware/api'
import { RequestMessageItem } from '../components/RequestMessageItem'
import {no_requests} from '../../../constants/compiledImages'

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
            ListEmptyComponent={() => {
                return (
                  <NotFound
                    title="No Requests"
                    titleStyle={{
                      fontFamily: "OpenSans-Bold",
                      fontSize: 18,
                    }}
                    image={no_requests}
                    style={{
                      width: 200,
                      height: 200,
                    }}
                  />
                );
              }}
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
        padding : 20,
        backgroundColor : 'white'
    }
})


export default MyRequestsScreen