import React from 'react'
import {View, Text} from 'react-native'
import {Switch} from 'react-native-elements'

const SettingScreen = props => {
    const [a ,setA] = React.useState(false)
    return (
        <View style={{flex : 1}}>
            <View style={{flexDirection:'row', alignItems :'center'}}>
                <Text style={{fontSize:20}}>Notifications</Text>
                <Switch onValueChange={() => setA(!a)} value={a} color="orange"/>
            </View>
            <View style={{flexDirection:'row', alignItems :'center'}}>
                <Text style={{fontSize:20}}>Dark Mode</Text>
                <Switch onValueChange={() => setA(!a)} value={a} color="orange"/>
            </View>
            <View style={{flexDirection:'row', alignItems :'center'}}>
                <Text style={{fontSize:20}}>ASK ME</Text>
                <Switch onValueChange={() => setA(!a)} value={a} color="orange"/>
            </View>
        </View>
    )
}

export default SettingScreen