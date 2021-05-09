import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import Body from "./Body";
import Header from "./Header";
import PostFooter from "./PostFooter";

const PostItem = (props) => {
  const post = props.post;
  return (
    <View style={styles.postItem}>
      <Header
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
      <PostFooter/>
    </View>
  );
};

const styles = StyleSheet.create({
    postItem : {
        marginBottom : 7
    }
});

export default PostItem;
