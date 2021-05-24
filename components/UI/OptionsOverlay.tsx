import React from "react";
import { View, StyleSheet, Button } from "react-native";
import { Overlay } from "react-native-elements";
import { TouchableButton } from "../../screens/Profile/TouchableButton";
import { AssinuText } from "./AssinuText";

export const OptionsOverlay = (props) => {
  return (
    <Overlay
     {...props}
    >
      {props.children}
    </Overlay>
  );
};

const styles = StyleSheet.create({
  
});
