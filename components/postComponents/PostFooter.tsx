import React from 'react'
import {View,StyleSheet } from 'react-native'
import {Button} from 'react-native-elements'
import { AntDesign,EvilIcons } from '@expo/vector-icons';
import {Colors} from '../../constants/Colors'

const PostFooter = (props) => {

    return(
        <View style={styles.postFooter}>
            <Button
            icon={<AntDesign name="like2" size={23} color={Colors.primary} />}
            type='clear'
            />

            <Button
            onPress={props.onOpenPost}
            title={props.numberOfComments}
            icon={<EvilIcons name="comment" size={23} color={Colors.secondary} />}
            type='clear'
            />
        </View>
    )
}

const styles = StyleSheet.create({
    postFooter: {
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent:'space-between',
        borderTopWidth:0.5,
        borderColor:'lightgrey',
        paddingHorizontal:30,
        alignItems:'center',
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10
    }
})

export default PostFooter;