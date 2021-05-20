import React from 'react'
import {View,StyleSheet } from 'react-native'
import {Button} from 'react-native-elements'
import { AntDesign,EvilIcons } from '@expo/vector-icons';
import {Colors} from '../../constants/Colors'

const PostFooter = (props) => {

    return(
        <View style={styles.postFooter}>
            <Button
            icon={<AntDesign name="like2" size={20} color={Colors.bluee2} />}
            type='clear'
            />

            <Button
            onPress={props.onOpenPost}
            titleStyle={{color:'grey'}}
            title={props.numberOfComments}
            icon={<EvilIcons name="comment" size={20} color={Colors.bluee2} />}
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
        borderColor:'lightgrey',
        paddingHorizontal:30,
        alignItems:'center',
        
    }
})

export default PostFooter;