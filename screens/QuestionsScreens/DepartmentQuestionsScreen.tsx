import React from "react";
import { View, StyleSheet } from "react-native";
import QuestionsScreen from "./QuestionsScreen";

const DepartmentQuestionsScreen = (props) => {
  return (
    <QuestionsScreen
      onPressFloatingButton={() =>
        props.navigation.navigate("CreateQuestionScreen", {
          username: userData.name,
          userImage: userData.imageUrl,
          userId: userData.userId,
        })
      }
      onPressSearchInput={() => props.navigation.navigate("SearchScreen")}
    ></QuestionsScreen>
  );
};

const styles = StyleSheet.create({});
