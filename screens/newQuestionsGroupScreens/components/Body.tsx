import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import HOST, { SERVER_PORT } from "../../../configs/config";
import HyperlinkedText from "react-native-hyperlinked-text";
import { Colors } from "../../../constants/Colors";
const Body = (props: any) => {
  return (
    <View style={styles.body}>
      <TouchableOpacity activeOpacity={0.7} onPress={props.onPress}>
        <HyperlinkedText
          linkStyle={{
            color: Colors.primary,
          }}
          style={styles.content}
        >
          {props.content}
        </HyperlinkedText>
      </TouchableOpacity>
      {props.imageUrl ? (
        <TouchableOpacity activeOpacity={0.7} onPress={props.openImage}>
          <Image
            style={{ width: "100%", aspectRatio: 1 / 1 }}
            source={{
              uri: `http://${HOST}:${SERVER_PORT}/${props.imageUrl}`,
            }}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: "white",
  },
  content: {
    fontSize: 15,
    paddingVertical: 5,
    paddingHorizontal: 7,
    fontFamily: "OpenSans-Regular",
  },
});

export default Body;
