import React from 'react'
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform
} from 'react-native'
import HOST, { SERVER_PORT } from '../../configs/config'

const SharedItem = props => {


    return (
        <TouchableOpacity
            onLongPress={props.onLongPress}
            activeOpacity={0.7}
            style={{ flex: 1 }}
            onPress={props.openDetails}
        >
            <View style={styles.sharedItem}>
                <View style={{ width: '100%', height: '100%' }}>
                    <Image
                        source={{
                            uri: `http://${HOST}:${SERVER_PORT}/${props.imageUrl}`
                        }}
                        style={styles.itemImage}
                        resizeMode='cover'
                    />
                </View>
                <View style={styles.itemNameContainer}>
                    <Text
                        numberOfLines={1}
                        style={styles.itemName}
                        ellipsizeMode='tail'
                    >
                        {props.itemName}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    sharedItem: {
        flex: 1,
        marginVertical: 15,
        marginHorizontal: 5,
        height: 145,
    },
    itemImage: {
        width: '100%',
        height: '100%'
    },
    itemNameContainer: {

    },
    itemName: {
        fontFamily: 'OpenSans-Bold',
        width: '100%'
    }
})

export default SharedItem;