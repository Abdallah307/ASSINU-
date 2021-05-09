import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import ProfileAvatarImage from "../../../components/profileComponents/ProfileAvatarImage";

const QuestionHeader = (props) => {
  return (
    <View style={styles.questionHeader}>
      <TouchableOpacity onPress={() => {}}>
        <View style={styles.info}>
          <ProfileAvatarImage
            imageUrl={props.imageUrl}
            style={styles.profileImage}
          />

          <View style={styles.questionInfo}>
            <Text style={styles.username}>{props.name}</Text>
            <Text style={styles.timestamp}>{props.date}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  questionHeader: {
    paddingHorizontal: 7,
    paddingVertical: 7,
    backgroundColor: "white",
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    fontSize: 14,
    fontFamily: "OpenSans-Bold",
  },
  timestamp: {
    fontSize: 12,
    color: "grey",
    fontFamily: "OpenSans-Light",
  },
});

export default QuestionHeader;
