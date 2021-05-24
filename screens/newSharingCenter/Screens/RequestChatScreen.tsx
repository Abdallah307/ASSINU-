import React, { useState, useRef, useEffect } from "react";
import {
  View,
  FlatList,
  ScrollView,
  TextInput,
  Text,
  StyleSheet,
  Keyboard,
} from "react-native";
import { Colors } from "../../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { RequestMessageItem } from "../components/RequestMessageItem";
import { Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import ChattingMessage from "../../Chat/ChattingMessage";
import axios from "axios";
import HOST, { SERVER_PORT } from "../../../configs/config";
import { useSelector } from "react-redux";
import { socket } from "../../../socket";

const RequestChatScreen = (props) => {
  const [messageInput, setMessageInput] = useState("");

  const [replays, setReplays] = useState([]);

  const flatRef = useRef(null);

  const { token, userId } = useSelector((state) => state.auth);

  const submitReplay = async () => {
    try {
      setMessageInput("");
      Keyboard.dismiss();
      const response = await axios.post(
        `http://${HOST}:${SERVER_PORT}/sharingcenter/requests/replay`,
        {
          content: messageInput,
          requestId: props.route.params.item._id,
          senderId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // if (response.status === 200) {
      //     setReplays(response.data.replays)
      // }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUsersReplays = async () => {
    try {
      const response = await axios.get(
        `http://${HOST}:${SERVER_PORT}/sharingcenter/requests/${props.route.params.item._id}/replays`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setReplays(response.data.replays);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsersReplays();
  }, []);

  useEffect(() => {
    socket.on("commingReplay", (data) => {
      if (data.requestId === props.route.params.item._id) {
        setReplays((prevState) => [...prevState, data.replay]);
      }
    });

    return () => {
      socket.off("commingReplay");
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        style={{ flex: 1, padding: 10 }}
        colors={["#219EBC", "#3b5998", "#192f6a"]}
      >
        <FlatList
          showsVerticalScrollIndicator={false}
          ref={flatRef}
          onContentSizeChange={() =>
            flatRef.current.scrollToEnd({ animated: true })
          }
          ListHeaderComponent={() => {
            return (
              <>
                <RequestMessageItem
                  item={props.route.params.item}
                  userImage={props.route.params.item.receiver.imageUrl}
                  username={`To ${props.route.params.item.receiver.name}`}
                />
                <ChattingMessage
                  messageContent={props.route.params.item.message}
                  containerStyle={styles.otherUserMessageItem}
                  messageStyle={styles.otherUserMessageTextStyle}
                />
              </>
            );
          }}
          data={replays}
          renderItem={({ item }) => {
            if (item.sender._id === userId) {
              return (
                <ChattingMessage
                  messageContent={item.content}
                  containerStyle={styles.userMessageItem}
                />
              );
            } else {
              return (
                <ChattingMessage
                  messageContent={item.content}
                  containerStyle={styles.otherUserMessageItem}
                  messageStyle={styles.otherUserMessageTextStyle}
                />
              );
            }
          }}
          keyExtractor={(item) => item._id}
        />
      </LinearGradient>
      <View style={styles.answerInputAndButtonContainer}>
        <TextInput
          placeholder="Write your message..."
          placeholderTextColor="white"
          multiline={true}
          style={styles.answerInput}
          value={messageInput}
          onChangeText={(value) => setMessageInput(value)}
        />
        {messageInput !== "" && (
          <Button
            type="clear"
            onPress={submitReplay}
            icon={<Ionicons name="send" size={30} color={Colors.primary} />}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: Colors.secondary
  },
  input: {
    width: "85%",
    borderTopWidth: 1,
    borderColor: "white",
    padding: 10,
    backgroundColor: Colors.prussianBlue,
    color: "white",
    maxHeight: 100,
  },
  inputContainer: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  answerInputAndButtonContainer: {
    flexDirection: "row",
    backgroundColor: Colors.prussianBlue,
  },
  answerInput: {
    maxHeight: 90,
    borderBottomWidth: 0.5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 0,
    borderColor: "grey",
    marginHorizontal: 0,
    flex: 1,
    backgroundColor: Colors.prussianBlue,
    color: "white",
    fontFamily: "OpenSans-Regular",
  },
  userMessageItem: {
    backgroundColor: Colors.primary,
    marginLeft: "auto",
    borderRadius: 20,
    padding: 15,
    overflow: "hidden",
  },
  otherUserMessageItem: {
    backgroundColor: "#eeeeee",
    marginRight: "auto",
    borderRadius: 20,
    padding: 15,
    overflow: "hidden",
  },
  otherUserMessageTextStyle: {
    color: "black",
  },
});

export default RequestChatScreen;
