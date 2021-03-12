import React from 'react'
import {View, ActivityIndicator} from 'react-native'
import {Colors} from '../../constants/Colors'

const CustomActivityIndicator = (props) => {
    return(
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <ActivityIndicator
            animating={true}
            color={Colors.primary}
            size='large'
            />
        </View>
    )
}

export default CustomActivityIndicator;