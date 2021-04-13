import React from 'react'
import {
    View,
    StyleSheet,
    TouchableNativeFeedback,
    Text,
    TouchableOpacity,
    Platform
} from 'react-native'
import ProfileAvatarImage from '../profileComponents/ProfileAvatarImage'

const MemberItem = (props: any) => {

    let TouchableCmp = TouchableOpacity;


    return (
        <TouchableCmp activeOpacity={0.7} onPress={() => console.log('pressed')}>
            <View style={styles.memberItem}>
                <ProfileAvatarImage
                    style={styles.avatar}
                    imageUrl={props.imageUrl}
                />
                <Text style={styles.name}>{props.name}</Text>
            </View>
        </TouchableCmp>
    )
}

const styles = StyleSheet.create({
    memberItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,

    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    name: {
        fontFamily: "OpenSans-Bold",

    }
})

export default MemberItem