import React, { useEffect } from 'react'
import {View,FlatList, StyleSheet, Text} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { NotificationItem } from '../../components/NotificationComponents/NotificationItem'
import NotFound from '../../components/UI/NotFound'
import { no_notifications } from '../../constants/compiledImages'
import {fetchNotifications} from '../../store/middleware/api'

const Notifications = (props) => {
    const dispatch = useDispatch()
    const notifications = useSelector(state => state.notifications.notifications)

    if (notifications.length === 0) {
        return (
            <NotFound
            title='No new Notification'
            titleStyle={{
                fontFamily : 'OpenSans-Bold',
                fontSize : 18
            }}
            image={no_notifications}
            style={{
                width : 200,
                height : 200
            }}
            />
        )
    }

    return(
        <View style={styles.mainView}>
            <FlatList
            showsVerticalScrollIndicator={false}
            data={notifications}
            renderItem={({item}) => {
                return (
                    <NotificationItem
                    //onPress={openNotification.bind(this, item)}
                    content={item.content}
                    />
                )
            }}
            keyExtractor={(item) => item._id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        padding : 5,
        backgroundColor : '#eeeeee'
    }
})

export default Notifications;