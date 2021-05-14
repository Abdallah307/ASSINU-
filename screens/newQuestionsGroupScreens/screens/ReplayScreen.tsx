import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Keyboard } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CommentItem from "../../../components/commentComponents/CommentItem";
import HOST, { SERVER_PORT } from "../../../configs/config";
import { actions as replayActions } from "../../../store/replay";
import Input from "../components/Input";
import { actions as commentActions } from "../../../store/comment";

const ReplayScreen = (props) => {
  const params = props.route.params;

  const [inputValue, setInputValue] = useState("");

  const dispatch = useDispatch();

  const { userId, token } = useSelector((state) => state.auth);

  const replays = useSelector((state) => {
    return state.replays.replays;
  });

  useEffect(() => {
    dispatch(replayActions.CLEAR_REPLAYS({}));
    fetchReplays();
  }, []);

  const fetchReplays = async () => {
    try {
      const response = await axios.get(
        `http://${HOST}:${SERVER_PORT}/group/replays/${params.comment._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        dispatch(
          replayActions.SET_REPLAYS({
            replays: response.data.replays,
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const submitReplay = async () => {
    try {
      setInputValue("");
      Keyboard.dismiss();
      const response = await axios.post(
        `http://${HOST}:${SERVER_PORT}/group/addreplay`,
        {
          referedTo: params.comment._id,
          content: inputValue,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        dispatch(
          replayActions.CREATE_REPLAY({
            replay: response.data.replay,
          })
        );

        dispatch(commentActions.INCREMENT_NUMBER_OF_REPLAYS({
            commentId : params.comment._id
        }))
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <FlatList
        ListHeaderComponent={() => {
          return (
            <>
              <CommentItem
                imageUrl={params.comment.owner.imageUrl}
                name={params.comment.owner.name}
                content={params.comment.content}
                createdAt={params.comment.createdAt}
              />
              <Text style={{ fontSize: 18 }}>Replays</Text>
            </>
          );
        }}
        data={replays}
        renderItem={({ item }) => {
          return (
            <CommentItem
              imageUrl={item.owner.imageUrl}
              content={item.content}
              createdAt={item.createdAt}
              name={item.owner.name}
            />
          );
        }}
        keyExtractor={(item) => item._id}
      />
      <Input
        value={inputValue}
        onChangeText={(value) => setInputValue(value)}
        onPressButton={submitReplay}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "magenta",
  },
});

export default ReplayScreen;
