import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Group from "../../screens/groupScreens/Group";
import CreatePostQuestionScreen from "../../screens/newQuestionsGroupScreens/screens/CreatePostQuestionScreen";
import FullPostScreen from "../../screens/newQuestionsGroupScreens/screens/FullPostScreen";
import FullAnswerScreen from "../../screens/newQuestionsGroupScreens/screens/FullAnswerScreen";
import FullQuestionScreen from "../../screens/newQuestionsGroupScreens/screens/FullQuestionScreen";
import AnswersReplayScreen from "../../screens/newQuestionsGroupScreens/screens/AnswerReplaysScreen";
import FullImageScreen from "../../screens/postsScreens/FullImageScreen";
import PostReplaysScreen from "../../screens/newQuestionsGroupScreens/screens/PostReplaysScreen";
import VotersListScreen from "../../components/groupComponents/VotersListScreen";
import GroupChatting from "../../screens/groupScreens/GroupChatting";
import ReplayScreen from "../../screens/newQuestionsGroupScreens/screens/ReplayScreen";
import CreatePollScreen from "../../screens/newQuestionsGroupScreens/screens/CreatePollScreen";
import { Colors } from "../../constants/Colors";
const Stack = createStackNavigator();

const GroupNavigator = (props) => {
  return (
    <Stack.Navigator
    screenOptions={{
      headerTintColor : 'white',
      headerTitleAlign : 'center',
      headerStyle : {
        backgroundColor : Colors.primary,
      }
    }}
    >
      <Stack.Screen
        options={{
          title : props.route.params.title,
        }}
        initialParams={props.route.params}
        name="GroupScreen"
        component={Group}
      />
      <Stack.Screen
        name="CreatePostQuestionScreen"
        component={CreatePostQuestionScreen}
        options={{
          title: "Share",
        }}
      />
      <Stack.Screen name="FullPostScreen" component={FullPostScreen} />
      <Stack.Screen name="FullAnswerScreen" component={FullAnswerScreen} />
      <Stack.Screen name="FullQuestionScreen" component={FullQuestionScreen} />
      <Stack.Screen
        name="AnswerReplaysScreen"
        component={AnswersReplayScreen}
      />
      <Stack.Screen name="FullImageScreen" component={FullImageScreen} />
      <Stack.Screen name="ReplayScreen" component={ReplayScreen} />
      <Stack.Screen name="VotersListScreen" component={VotersListScreen} />
      <Stack.Screen
        options={({ route }) => ({
          title: route.params.title,
        })}
        name="ChattingScreen"
        component={GroupChatting}
      />
      <Stack.Screen name="CreatePollScreen" component={CreatePollScreen} />
    </Stack.Navigator>
  );
};

export default GroupNavigator;
