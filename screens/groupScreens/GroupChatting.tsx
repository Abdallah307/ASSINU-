import React, { useState, useEffect, useRef } from "react";
import { View, FlatList, Text, StyleSheet, ToastAndroid } from "react-native";
import ChattingMessage from "../Chat/ChattingMessage";
import { Colors } from "../../constants/Colors";
import HOST, { SERVER_PORT } from "../../configs/config";
import axios from "axios";
import { useSelector } from "react-redux";
import IO from "socket.io-client";
import { CourseGroup } from "../../api/api";
import { socket } from "../../socket";
import Chat from "../Chat/Chat";
import NotFound from "../../components/UI/NotFound";
import {group_chat} from '../../constants/compiledImages'
import CustomActivityIndicator from "../../components/UI/CustomActivityIndicator";

const ChattingScreen = (props) => {
  const [messages, setMessages] = useState([]);

  const [message, setMessage] = useState("");

  const [isTyping, setIsTyping] = useState(false);

  const [typingUsername, setTypingUsername] = useState("");

  const [isLoaded , setIsLoaded] = useState(false)

  const username = useSelector((state) => {
    return state.auth.name;
  });

  const params = props.route.params;

  const { userId, token } = useSelector((state) => {
    return state.auth;
  });

  useEffect(() => {
    // socket.connect()
    console.log("Grop");
    const fetchGroupMessages = async () => {
        setIsLoaded(false)
      try {
        const response = await CourseGroup.fetchGroupMessages(
          params.groupId,
          token
        );

        if (response.status === 200) {
          setIsLoaded(true)
          setMessages(response.data.messages);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchGroupMessages();

    // return () => {
    //     socket.disconnect()
    // }
  }, []);

  useEffect(() => {
    const listener = (data) => {
      if (data.action === "addmessage")
        if (data.message.groupId == params.groupId) addMessage(data.message);
    };

    const isTypingListener = (data) => {
      if (data.groupId == params.groupId) {
        setTypingUsername(data.username);
        setIsTyping(true);
      }
    };

    const stoppedTypingListener = (data) => {
      if (data.groupId == params.groupId) {
        setIsTyping(false);
      }
    };

    socket.on("message", listener);
    socket.on("tttG", isTypingListener);
    socket.on("stoppedTypingG", stoppedTypingListener);

    return () => {
      socket.off("message", listener);
      socket.off("tttG", isTypingListener);
      socket.off("stoppedTypingG", stoppedTypingListener);
    };
  }, []);

  const addMessage = (msg) => {
    setMessages((prevState) => [...prevState, msg]);
  };

  const sendMessage = () => {
    socket.emit("typingEventG", {
      value: "",
      groupId: props.route.params.groupId,
      username: username,
    });
    let msg = message;
    setMessage("");
    setIsTyping(false);
    axios
      .post(
        `http://${HOST}:${SERVER_PORT}/group/messages/addmessage`,
        {
          ownerId: userId,
          groupId: props.route.params.groupId,
          content: message,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(() => {
        ToastAndroid.show("Sent", ToastAndroid.SHORT);
      })
      .catch((err) => console.log(err));
  };

  if (!isLoaded) {
      return (
          <CustomActivityIndicator/>
      )
  }

  return (
    <Chat
      messages={messages}
      onTextInputChange={(value) => {
        socket.emit("typingEventG", {
          value: value,
          groupId: props.route.params.groupId,
          username: username,
        });
        setMessage(value);
      }}
      onSend={sendMessage}
      userId={userId}
      typerUsername={typingUsername}
      isTyping={isTyping}
    />
  );
};

export default ChattingScreen;
