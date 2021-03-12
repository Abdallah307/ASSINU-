import React, { useState } from 'react'
import { AppRegistry, StyleSheet, Text, View , Dimensions} from 'react-native'
import Carousel from 'react-native-snap-carousel';
import CarouselItem from './CarouselItem'

const SharingCenterScreen = () => {
    const [enteries, setEnteries] = useState([
        {
            name: 'abd'
        },
        {
            name: 'ali'
        }, 
        {
            name: 'sameer'
        }
    ])
    return (
        <View style={{ flex: 1, justifyContent:'center' }}>
            <View style={{flex: 1}}>

            </View>
            <Carousel
            data={enteries}
            renderItem={({item}) => {
                return (
                    <CarouselItem/>
                )
            }}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={Dimensions.get('window').width - 60}
            />
            <View style={{flex:1}}>

            </View>
        </View>

    )

}

export default SharingCenterScreen

