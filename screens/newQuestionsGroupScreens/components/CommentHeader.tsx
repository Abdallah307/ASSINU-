import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import ProfileAvatarImage from "../../../components/profileComponents/ProfileAvatarImage";
import { AssinuText } from "../../../components/UI/AssinuText";

const CommentHeader = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.4} onPress={props.onPressHeader}>
      <View style={styles.commentHeader}>
        <ProfileAvatarImage
          imageUrl={props.imageUrl}
          style={{ width: 40, height: 40, borderRadius: 20 }}
        />
        <View>
          <AssinuText>{props.name}</AssinuText>
          <AssinuText>{new Date(props.date).toDateString()}</AssinuText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default CommentHeader;
