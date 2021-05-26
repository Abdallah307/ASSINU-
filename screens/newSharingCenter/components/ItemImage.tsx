import React from 'react'
import {View,Image, StyleSheet} from 'react-native'
import HOST, { SERVER_PORT } from '../../../configs/config'

const ItemImage = props => {
    return (
        <View style={styles.itemImageContainer}>
          <Image
            source={{
              uri: `http:${HOST}:${SERVER_PORT}/${props.imageUrl}`,
            }}
            style={styles.itemImage}
          />
        </View>
    )   
}

const styles = StyleSheet.create({
    itemImageContainer: {
        width: "100%",
        aspectRatio: 4 / 3,
      },
      itemImage: {
        width: "100%",
        height: "100%",
      },
})

export default ItemImage