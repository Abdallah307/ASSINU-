import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, {useState} from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-elements";
import { Colors } from "../../../constants/Colors";

const QuestionFooter = (props) => {
  const [isFollowed, setIsFollowed] = useState(props.isFollowed)
  return (
    <View style={styles.questionFooter}>
      <Button
        onPress={props.onAnswerPressed}
        title="Answer"
        buttonStyle={styles.button}
        type="clear"
        titleStyle={styles.buttonTitle}
        icon={
          <Ionicons
            name="ios-create-outline"
            size={20}
            color={Colors.prussianBlue}
          />
        }
      />
      <Button
        onPress={() => {
          props.onFollowPressed()
          setIsFollowed(!isFollowed)
        }}
        title="Follow"
        buttonStyle={styles.button}
        type="clear"
        titleStyle={{...styles.buttonTitle, color : isFollowed ? Colors.primary : 'grey'}}
        icon={
          <MaterialCommunityIcons
            name="signal-variant"
            size={20}
            color={isFollowed ? Colors.primary : 'grey'}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  questionFooter: {
    flexDirection: "row",
    backgroundColor: "white",
    width: "100%",
  },
  button: {},
  buttonTitle : {
    color : 'grey'
}
});

export default QuestionFooter;
