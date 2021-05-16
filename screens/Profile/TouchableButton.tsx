import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { AssinuText } from "../../components/UI/AssinuText";
import { Colors } from "../../constants/Colors";

export const TouchableButton = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{ ...styles.touchableButton, ...props.style }}
    >
      <AssinuText style={{...styles.touchableButtonTitle, ...props.titleStyle}}>{props.title}</AssinuText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginVertical: 10,
  },
  touchableButtonTitle: {
    color: "white",
    fontFamily: "OpenSans-Bold",
  },
});
