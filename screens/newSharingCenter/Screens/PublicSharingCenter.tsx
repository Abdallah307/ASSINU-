import React, { useEffect } from 'react'
import {View,Text,FlatList, StyleSheet} from 'react-native'
import {fetchPublicSharedItems} from '../../../store/middleware/api'
import {useDispatch, useSelector} from 'react-redux'
import ShopItem from '../components/ShopItem'
import NotFound from '../../../components/UI/NotFound'
import { no_shared_items } from '../../../constants/compiledImages'

const PublicSharingCenter = props => {
    const dispatch = useDispatch()
    const items = useSelector(state=> state.sharingCenter.publicItems)

    useEffect(() => {
        dispatch(fetchPublicSharedItems())
    }, [])

    const openItem = (item) => {
        props.navigation.navigate('ItemDetailsScreen', {
            item : item
        })
    }

    return (
        <View style={styles.mainContainer}>
            <FlatList
            ListEmptyComponent={() => {
                return (
                  <NotFound
                    title="No new Items"
                    titleStyle={{
                      fontFamily: "OpenSans-Bold",
                      fontSize: 18,
                    }}
                    image={no_shared_items}
                    style={{
                      width: 200,
                      height: 200,
                    }}
                  />
                );
              }}
            numColumns={2}
            data={items}
            renderItem={({item}) => {
                return (
                    <ShopItem
                    onPress={openItem.bind(this, item)}
                    imageUrl={item.imageUrl}
                    title={item.title}
                    price={item.price}
                    />
                )
            }}
            keyExtractor={(item) => item._id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer : {
        flex : 1,
        backgroundColor : 'white'
    }
})

export default PublicSharingCenter