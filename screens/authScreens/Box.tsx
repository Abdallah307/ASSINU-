import React from 'react'
import {
    View,
    StyleSheet,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity
} from 'react-native'
import { Colors } from '../../constants/Colors'

const Box = props => {
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={props.onPress}>
            <View style={styles.box}>
                <Image
                    source={props.backgroundImage}
                    style={{ width: 120, height: 300 }}
                    resizeMode='contain'
                />
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <Text style={styles.title}>{props.title}</Text>
                </View>

            </View>
        </TouchableOpacity>
    )
}

export default Box

const styles = StyleSheet.create({
    box: {
        width: '100%',
        flexDirection: 'row',
        aspectRatio: 2 / 1,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.primary
    },
    title: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 18,
        color: 'white',
    }
})