/**
 * Created by Abdallah Dereia
 */

import React, { useState } from "react";
import { Colors } from "../../constants/Colors";
import { View, StyleSheet, FlatList, Text } from "react-native";
import ChatMessagesList from "./ChatMessagesList";
import ChattingInput from "./ChattingInput";
import StartChatting from "./StartChatting";
import { IsTypingPoints } from "./IsTypingPoints";
import { useSelector } from "react-redux";
import NotFound from "../../components/UI/NotFound";
import { group_chat } from "../../constants/compiledImages";

interface Props {
  isTyping?: boolean;
  messages: Array<object>;
  userId: string | number;
  onTextInputChange: Function;
  typerUsername: string;
  onSend: Function;
}

const Chat = (props: Props) => {
  const [message, setMessage] = useState("");
  const { userId } = useSelector((state) => state.auth);

  return (
    <View style={styles.chattingScreen}>
      {props.messages.length === 0 ? (
        <NotFound
          title="Start Chatting"
          titleStyle={{
            fontFamily: "OpenSans-Bold",
            fontSize: 18,
          }}
          image={group_chat}
          style={{
            width: 200,
            height: 200,
          }}
        />
      ) : (
        <ChatMessagesList userId={props.userId} messages={props.messages} />
      )}

      {props.isTyping && (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <IsTypingPoints />
          <Text style={{ color: Colors.primary }}>
            {" "}
            {props.typerUsername} is typing..
          </Text>
        </View>
      )}

      <ChattingInput
        value={message}
        onChangeText={(value) => {
          setMessage(value);
          props.onTextInputChange(value);
        }}
        onSend={() => {
          setMessage("");
          props.onSend();
        }}
      />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  chattingScreen: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
});
