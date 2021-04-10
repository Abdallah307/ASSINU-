import React from 'react'
import { View, StyleSheet, ScrollView, ImageBackground, Text } from 'react-native'
import ProfileAvatarImage from '../../components/profileComponents/ProfileAvatarImage'
import ImageHeader from '../../components/sharingCenterComponents/ImageHeader'
import HOST, { SERVER_PORT } from '../../configs/config'
import { Button } from 'react-native-elements'
import { Colors } from '../../constants/Colors'

const ItemDetailsScreen = props => {
    const item = props.route.params.item
    return (
        <ScrollView style={styles.mainContainer}>
            <View style={{ width: '100%', aspectRatio: 4 / 3 }}>
                <ImageBackground
                    resizeMode='cover'
                    source={{
                        uri: `http://${HOST}:${SERVER_PORT}/${item.imageUrl}`
                    }}
                    style={styles.itemImage}
                />
            </View>
            <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
                <ProfileAvatarImage
                    style={{ width: 30, height: 30, borderRadius: 15 }}
                    imageUrl={item.imageUrl}
                />
                <Text>Abdallah Dereia</Text>
            </View>
            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{item.name}</Text>
            </View>

            <Button
                containerStyle={{ padding: 10 }}
                title='Message'
                buttonStyle={{ borderRadius: 10, padding: 15, backgroundColor:Colors.primary }}
            />
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: 1,
                paddingBottom: 20,
                borderColor: 'grey'
            }}>
                <Text style={{ fontFamily: 'OpenSans-Regular' }}>Message the owner to ask for it</Text>
            </View>

            <View style={{ padding: 10 }}>
                <Text
                    style={{ fontSize: 25, fontWeight: 'bold' }}
                    
                >
                    Details
                </Text>
            </View>

            <View style={{
                padding: 10,
                borderBottomWidth: 1,
                borderColor: 'grey',
                paddingBottom: 20
            }}>
                <Text style={{fontFamily:'OpenSans-Regular' , fontSize:15}}>{item.details}</Text>
            </View>





        </ScrollView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    itemImage: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    }

})

export default ItemDetailsScreen