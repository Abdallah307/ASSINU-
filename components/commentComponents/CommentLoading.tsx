import React from 'react'
import { View, Text } from 'react-native'
import CommentItem from './CommentItem'
import { Colors } from '../../constants/Colors'

const CommentLoading = (props:any) => {
    return (
        <View style={{ justifyContent: 'center' }}>

            <CommentItem
                content={props.content}
                imageUrl={props.imageUrl}
                name={props.name}
            >
                <Text style={{ color: Colors.primary }}>Commenting...</Text>

            </CommentItem>

        </View>

    )
}

export default CommentLoading;

