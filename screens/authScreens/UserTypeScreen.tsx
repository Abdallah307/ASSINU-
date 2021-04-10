import React from 'react'
import { View, StyleSheet, Text, ImageBackground } from 'react-native'
import { Colors } from '../../constants/Colors'
import Box from './Box'

const UserTypeScreen = props => {
    return (
     
        <View style={styles.userTypeScreen}>
            <Box
                onPress={() => {}}
                backgroundImage={require('../../assets/teacher.png')}
                title='Teacher'
            />
            <Box
                onPress={() => {props.navigation.navigate('AuthNavigator')}}
                backgroundImage={require('../../assets/student.png')}
                title='Student'
            />
        </View>
      
    )
}

const styles = StyleSheet.create({
    userTypeScreen: {
        backgroundColor:Colors.blueGreen,
        flex: 1,
        padding: 30,
        justifyContent:'space-around',
    },
})

export default UserTypeScreen;