import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'

const SharedItem = props => {
    return (
        <View style={styles.sharedItem}>
            <View style={{width:'100%', height:'100%'}}>
                <Image
                    source={{
                        uri: 'https://images.pexels.com/photos/1472443/pexels-photo-1472443.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
                    }}
                    style={styles.itemImage}
                    resizeMode='center'
                />
            </View>
            <View style={styles.itemNameContainer}>
                <Text>{props.itemName}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    sharedItem: {
        flex: 1,
        marginVertical: 15,
        marginHorizontal:5,
        height: 145,
    },
    itemImage: {
        width: '100%',
        height: '100%'
    },
    itemNameContainer: {

    }
})

export default SharedItem;