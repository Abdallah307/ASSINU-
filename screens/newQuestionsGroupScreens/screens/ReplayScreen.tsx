import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Keyboard } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import HOST, { SERVER_PORT } from "../../../configs/config";
import { actions as replayActions } from "../../../store/replay";
import Input from "../components/Input";
import { actions as commentActions } from "../../../store/comment";
import CommentItem from "../components/CommentItem";
import { sharedStyles } from "../../../SharedSytles";

const ReplayScreen = (props) => {
  const params = props.route.params;

  const [inputValue, setInputValue] = useState("");

  const dispatch = useDispatch();

  const { userId, token, name } = useSelector((state) => state.auth);

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

  const openUserProfile = (user) => {
    if (user._id !== userId) {
      props.navigation.navigate('StudentProfile', {
        user : user
      })
    }
    else {
      props.navigation.navigate('Profile')
    }
  }

  const submitReplay = async () => {
    try {
      setInputValue("");
      Keyboard.dismiss();
      const response = await axios.post(
        `http://${HOST}:${SERVER_PORT}/group/addreplay`,
        {
          referedTo: params.comment._id,
          content: inputValue,
          username : name 
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
        contentContainerStyle={{paddingBottom : 200}}
        ListHeaderComponent={() => {
          return (
            <>
              <CommentItem
                comment={params.comment}
                style={sharedStyles.commentItem}
                onPressHeader={openUserProfile.bind(this, params.comment.owner)}
              />
              <Text style={{ fontSize: 18 }}>Replays</Text>
            </>
          );
        }}
        data={replays}
        renderItem={({ item }) => {
          return (
            <CommentItem
              comment={item}
              onPressHeader={openUserProfile.bind(this, item.owner)}
              style={sharedStyles.replayItem}
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
    backgroundColor: 'white',
  },
});

export default ReplayScreen;
