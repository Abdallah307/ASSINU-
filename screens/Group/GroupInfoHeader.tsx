import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, StyleSheet, Text, ImageBackground } from "react-native";
import { Button } from "react-native-elements";
import { Colors } from "../../constants/Colors";

const GroupInfo = (props) => {
  return (
    <View style={styles.groupInfo}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text numberOfLines={2} style={styles.groupTitle}>
          {props.title}
        </Text>
        {props.showChattingButton && (
          <Button
            onPress={props.openChatting}
            type="clear"
            icon={
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={35}
                color={Colors.primary}
              />
            }
          />
        )}
      </View>

      <Text style={styles.membersCount}>
        {props.numberOfMembers} Participants
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  groupInfo: {
    backgroundColor: "white",
    height: 80,
    paddingLeft: 20,
    marginBottom: 5,
  },
  groupTitle: {
    fontSize: 22,
    color: "black",
    fontFamily: "OpenSans-Bold",
    width: "80%",
  },
  membersCount: {
    fontSize: 13,
    color: "black",
    fontFamily: "OpenSans-Regular",
  },
});

export default GroupInfo;
