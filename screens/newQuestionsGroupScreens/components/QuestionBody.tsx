import React from "react";
import { View, StyleSheet, Text,TouchableOpacity,Image  } from "react-native";
import HyperlinkedText from 'react-native-hyperlinked-text'
import { Colors } from '../../../constants/Colors'

const QuestionBody = (props) => {
  return (
    <View style={styles.questionBody}>
      <TouchableOpacity activeOpacity={0.7} onPress={props.onOpenPost}>
        <HyperlinkedText
          linkStyle={{
            color: Colors.primary,
          }}
          style={styles.postContent}
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
  postBody: {
    backgroundColor: "white",
    paddingVertical: 12,
  },
  postContent: {
    fontSize: 15,
    paddingVertical: 5,
    paddingHorizontal: 15,
    fontFamily: "OpenSans-Regular",
    //marginTop:40,
  },
});

export default QuestionBody;
