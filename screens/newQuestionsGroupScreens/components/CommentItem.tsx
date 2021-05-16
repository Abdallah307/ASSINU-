import React from "react";
import { View, StyleSheet } from "react-native";
import CommentBodyContent from "../../../components/commentComponents/CommentBodyContent";
import ProfileAvatarImage from "../../../components/profileComponents/ProfileAvatarImage";
import { AssinuText } from "../../../components/UI/AssinuText";
import {Button} from 'react-native-elements'
import CommentHeader from "./CommentHeader";

const CommentItem = (props) => {
  return (
    <View style={{...styles.item, ...props.style}}>
        <CommentHeader
        date={props.comment.createdAt}
        onPressHeader={props.onPressHeader}
        name={props.comment.owner.name}
        imageUrl={props.comment.owner.imageUrl}
        />
        <CommentBodyContent content={props.comment.content}/>
        <View style={styles.commentChildren}>
            {props.children}
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    item :  {
        backgroundColor: '#eeeeee',
        marginVertical : 20,
        padding : 10,
        borderRadius : 20,
        overflow : 'hidden',
    },
    commentHeader : {
        flexDirection : 'row',
        alignItems : 'center',
    },
    commentChildren : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'flex-end'
    }
})

export default CommentItem;
