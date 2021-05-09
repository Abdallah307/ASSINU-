import React, { useState } from 'react'
import { View, StyleSheet, Text, ImageBackground } from 'react-native'

const GroupCoverImage = props => {
    return (
        <View>
            <ImageBackground
                style={styles.backgroundImage}
                source={require('../../assets/groupImage.jpg')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    backgroundImage: {
        width: "100%",
        aspectRatio: 2 / 1
    },
})

export default GroupCoverImage;