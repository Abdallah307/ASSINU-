import React from "react";
import { View } from "react-native";
import PostItem from "../newQuestionsGroupScreens/components/PostItem";

export const FullPostNotifications = (props) => {
  return (
    <View style={{flex : 1}}>
      <PostItem post={props.route.params.post} />
    </View>
  );
};
