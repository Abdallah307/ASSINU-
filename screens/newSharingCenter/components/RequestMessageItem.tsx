import React from "react";
import { View, TouchableOpacity, StyleSheet, Image, Text } from "react-native";
import ProfileAvatarImage from "../../../components/profileComponents/ProfileAvatarImage";
import { AssinuText } from "../../../components/UI/AssinuText";

export const RequestMessageItem = (props) => {

  const item = props.item 

  return (
    <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
      <View style={styles.requestMessageItem}>
        <View style={styles.requestOwnerInfo}>
          <ProfileAvatarImage
            imageUrl={props.userImage}
            style={styles.requestOwnerImage}
          />
          <AssinuText>{props.username}</AssinuText>
        </View>
        <View style={styles.requestInfo}>
          <ProfileAvatarImage
            imageUrl={item.sharedItem.imageUrl}
            style={styles.itemThumbnail}
          />
          <AssinuText
            ellipsizeMode="tail"
            numberOfLines={1}
            style={{ width: "80%" }}
          >
            {item.sharedItem.title}
          </AssinuText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  requestMessageItem: {
    backgroundColor: "white",
    marginVertical: 10,
    borderRadius: 10,
  },
  requestOwnerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  requestOwnerInfo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  requestInfo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  itemThumbnail: {
    width: 50,
    height: 50,
  },
});
