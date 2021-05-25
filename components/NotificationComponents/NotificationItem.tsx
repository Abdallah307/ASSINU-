import React from "react";
import { View,TouchableOpacity, Text, StyleSheet } from "react-native";

export const NotificationItem = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
    <View
      style={styles.notificationItem}
    >
      <Text>{props.content}</Text>
    </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    notificationItem : {
        paddingHorizontal: 10,
        paddingVertical : 30,
        backgroundColor: "white",
        marginVertical : 5,
        elevation : 3,
        borderRadius : 1
    }
})
