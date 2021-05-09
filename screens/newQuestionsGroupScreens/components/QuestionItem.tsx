import React from "react";
import { View, StyleSheet, Text } from "react-native";
import QuestionHeader from "./QuestionHeader";
import QuestionBody from "./QuestionBody";
import QuestionFooter from "./QuestionFooter";
import Header from "./Header";
import Body from "./Body";
import { AssinuText } from "../../../components/UI/AssinuText";

const QuestionItem = (props) => {
  const question = props.question;

  return (
    <View style={styles.questionItem}>
      <Header
        name={question.owner.name}
        date={question.createdAt}
        imageUrl={question.owner.imageUrl}
      />
      <Body onPress={props.onPress} 
      content={question.content} 
      openImage={props.openImage}
      imageUrl={question.imageUrl}
      />
      <View style={styles.questionInfo}>
        <AssinuText style={{ paddingHorizontal: 7 }}>
          {props.numberOfAnswers} Answers
        </AssinuText>
      </View>
      <QuestionFooter
        isFollowed={props.isFollowed}
        onFollowPressed={props.onFollowPressed}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  questionItem: {
    marginBottom: 7,
    backgroundColor: "white",
  },
  questionInfo : {
    
  }
});

export default QuestionItem;
