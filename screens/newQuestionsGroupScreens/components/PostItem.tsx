import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { AssinuText } from "../../../components/UI/AssinuText";
import Body from "./Body";
import Header from "./Header";
import PostFooter from "./PostFooter";

const PostItem = (props) => {
  const post = props.post;
  return (
    <View style={styles.postItem}>
      <Header
        showGroupName={props.showGroupName}
        groupName={props.groupName}
        onPressOptionsButton={props.onPressOptionsButton}
        showOptions={props.showOptions}
        onPressHeader={props.onPressHeader}
        name={post.owner.name}
        date={post.createdAt}
        imageUrl={post.owner.imageUrl}
      />
      <Body
      onPress={props.onPress}
      content={post.content}
      imageUrl={post.imageUrl}
      openImage={props.openImage}
      />
      <View style={styles.postInfo}>
        <AssinuText>{post.numberOfLikes} Likes</AssinuText>
        <AssinuText>{post.numberOfComments} Comments</AssinuText>
      </View>
      <PostFooter
      onLikePostPressed={props.onLikePostPressed}
      isLiked={props.isLiked}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    postItem : {
        marginBottom : 7
    },
    postInfo : {
      flexDirection :'row',
      justifyContent : 'space-between',
      paddingRight :10,
      paddingLeft : 5,
      paddingVertical : 5,
      backgroundColor : 'white' 
    }
});

export default PostItem;
