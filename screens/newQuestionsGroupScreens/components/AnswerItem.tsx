import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Body from "./Body";
import Header from "./Header";
import AnswerFooter from "./AnswerFooter";
import { AssinuText } from "../../../components/UI/AssinuText";

const AnswerItem = (props) => {
  return (
    <View style={styles.answerItem}>
      <Header
        onPressHeader={props.onPressHeader}
        name={props.answer.owner.name}
        imageUrl={props.answer.owner.imageUrl}
        date={props.answer.createdAt}
      />
      <Body onPress={props.onPress} content={props.answer.content} />
      <View style={{ flexDirection: "row", paddingHorizontal: 5, paddingVertical : 5 }}>
        <AssinuText style={{ marginRight: 10 }}>{props.answer.numberOfUpvotes} Upvotes</AssinuText>
        <AssinuText style={{marginRight : 'auto'}}>
          {props.answer.numberOfDownvotes} Downvotes
        </AssinuText>
        <AssinuText>{props.answer.numberOfComments} Discussion</AssinuText>
      </View>
      <AnswerFooter
        isUpvoted={props.isUpvoted}
        isDownvoted={props.isDownvoted}
        upvoteAnswer={props.upvoteAnswer}
        downvoteAnswer={props.downvoteAnswer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  answerItem: {
    marginBottom: 10,
    backgroundColor: "white",
  },
});

export default AnswerItem;
