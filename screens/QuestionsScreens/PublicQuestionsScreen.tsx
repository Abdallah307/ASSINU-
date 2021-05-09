import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";
import QuestionItem from "../../components/questionsComponents/QuestionItem";
import { useSelector, useDispatch } from "react-redux";
import { fetchUniversityQuestions } from "../../store/middleware/api";
import CustomActivityIndicator from "../../components/UI/CustomActivityIndicator";
import QuestionsScreen from "../QuestionsScreens/QuestionsScreen";
import withQuestions from "../QuestionsScreens/WithQuestions";

const PublicQAScreen = (props: any) => {
  const dispatch = useDispatch();

  const { renderQuestions, openCreateQuestion } = props;

  const { questions, isLoaded } = useSelector((state) => {
    return state.questions;
  });

  const userId = useSelector((state) => {
    return state.auth.userId;
  });

  useEffect(() => {
    dispatch(fetchUniversityQuestions({}));
  }, [dispatch]);

  return (
    <QuestionsScreen
      onPressFloatingButton={openCreateQuestion}
      onPressSearchInput={() => props.navigation.navigate("SearchScreen")}
    >
      {!isLoaded ? (
        <CustomActivityIndicator />
      ) : (
        <FlatList
          contentContainerStyle={{ paddingBottom: 150 }}
          data={questions}
          renderItem={renderQuestions}
          keyExtractor={(item) => item._id}
        />
      )}
    </QuestionsScreen>
  );
};

const styles = StyleSheet.create({
  floatingButton: {},
  searchView: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 10,
    paddingVertical: 15,
    borderColor: "#aaa",
  },
});

export default withQuestions(PublicQAScreen);
