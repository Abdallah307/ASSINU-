import { AntDesign, EvilIcons } from '@expo/vector-icons'
import React from 'react'
import {View, StyleSheet, Text} from 'react-native'
import {Button} from 'react-native-elements'


const PostFooter = props => {
    return (
        <View style={styles.postFooter}>
            <Button 
            title='Like'
            icon={<AntDesign name="like2" size={23} color='grey' />}
            onPress={props.onLikePressed}
            type='clear'
            titleStyle={styles.buttonTitle}
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