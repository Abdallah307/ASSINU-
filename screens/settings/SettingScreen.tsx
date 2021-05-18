import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {Switch} from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import { Colors } from '../../constants/Colors'
import SwitchItem from './SwitchItem'
import {switchMyAskStatus, switchNotificationsStatus} from '../../store/middleware/api'

const SettingScreen = props => {
    //const [notificationsStatus ,setNotificationsStatus] = useState(false)
    //const [askStatus ,setAskStatus] = useState(false)
    const {notifications, myAsk} = useSelector(state => state.auth)
    console.log(notifications, myAsk)
    const dispatch = useDispatch()

    return (
        <View style={styles.settingScreen}>
            <SwitchItem
            switchTitle='Notifications'
            switchColor={Colors.primary}
            switchValue={notifications}
            onValueChange={() => dispatch(switchNotificationsStatus())}
            />
             <SwitchItem
            switchTitle='My ASK'
            switchColor={Colors.primary}
            switchValue={myAsk}
            onValueChange={() => dispatch(switchMyAskStatus()) }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    settingScreen : {
        flex: 1,
        padding : 30,
        backgroundColor : 'white'
    }
})

export default SettingScreen