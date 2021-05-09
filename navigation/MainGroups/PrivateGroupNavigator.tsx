import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PrivateGroup from "../../screens/newQuestionsGroupScreens/screens/PrivateGroup";
import CreatePostQuestionScreen from "../../screens/newQuestionsGroupScreens/screens/CreatePostQuestionScreen";
import FullPostScreen from "../../screens/newQuestionsGroupScreens/screens/FullPostScreen";
import FullAnswerScreen from "../../screens/newQuestionsGroupScreens/screens/FullAnswerScreen";
import ReplaysScreen from "../../screens/newQuestionsGroupScreens/screens/ReplaysScreen";
import FullQuestionScreen from "../../screens/newQuestionsGroupScreens/screens/FullQuestionScreen";
import FullImageScreen from "../../screens/postsScreens/FullImageScreen";

const Stack = createStackNavigator();

const PrivateGroupNavigator = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PrivateGroup" component={PrivateGroup} />
      <Stack.Screen
        name="CreatePostQuestionScreen"
        component={CreatePostQuestionScreen}
        options={{
            title : 'Share'
        }}
      />
      <Stack.Screen name='FullPostScreen' component={FullPostScreen} />
      <Stack.Screen name='FullAnswerScreen' component={FullAnswerScreen}/>
      <Stack.Screen name='FullQuestionScreen' component={FullQuestionScreen} />
      <Stack.Screen name='ReplaysScreen' component={ReplaysScreen} />
      <Stack.Screen name="FullImageScreen" component={FullImageScreen}/>
    </Stack.Navigator>
  );
};

export default PrivateGroupNavigator;
