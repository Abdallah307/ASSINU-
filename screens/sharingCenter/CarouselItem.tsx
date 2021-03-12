import React from 'react'
import { View, Image, Text, StyleSheet, ImageBackground } from 'react-native'

const CarouselItem = props => {
    return (
        <View style={styles.item}>
            <Image
            style={{width:'100%', height:'80%', borderRadius:30}}
            source={{
                uri:'https://images.pexels.com/photos/2880285/pexels-photo-2880285.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                
            }}
            />
            <View style={{height:'20%', paddingHorizontal:20}}>
                <Text>CPU Lab Kit</Text>
                <Text>by Abdallah Dereia</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        width:'100%',
        aspectRatio: 1.6 / 1,
        backgroundColor: 'yellow',
        borderRadius:30,
    },
    
})

export default CarouselItem;