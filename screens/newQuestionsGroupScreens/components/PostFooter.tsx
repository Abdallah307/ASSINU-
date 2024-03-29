import { AntDesign, EvilIcons } from '@expo/vector-icons'
import React from 'react'
import {View, StyleSheet, Text} from 'react-native'
import {Button} from 'react-native-elements'
import { Colors } from '../../../constants/Colors'


const PostFooter = props => {
    return (
        <View style={styles.postFooter}>
            <Button 
            onPress={props.onLikePostPressed}
            title='Like'
            icon={
            <AntDesign 
            name="like2" 
            size={23} 
            color={props.isLiked ? Colors.primary : 'grey'} 
            />
        }
            type='clear'
            titleStyle={{...styles.buttonTitle, color : props.isLiked ? Colors.primary : 'grey'}}
            />
            <Button 
            title='Comment'
            icon={<EvilIcons name="comment" size={23} color='grey' />}
            onPress={props.onCommentPressed}
            type='clear'
            titleStyle={styles.buttonTitle}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    postFooter : {
        flexDirection : 'row',
        backgroundColor : 'white'
    },
    buttonTitle : {
        color : 'grey'
    }
})

export default PostFooter;