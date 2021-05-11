import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublicGroupData } from "../../../store/middleware/api";
import { Button } from "react-native-elements";
import { withGroup } from "../withGroup";
import FloatingButton from "../../../components/UI/FloatingButton";
import { Colors } from "../../../constants/Colors";

const PublicGroup = (props) => {
  const dispatch = useDispatch();
  const params = props.params;
  const data = useSelector((state) => {
    return state.publicGroup.data;
  });

  const { renderData, onPressFloatingButton } = props;

  useEffect(() => {
    dispatch(fetchPublicGroupData({}));
  }, []);


  return (
    <View style={styles.mainContainer}>
      <FlatList
        contentContainerStyle={{ paddingBottom: 150 }}
        data={data}
        renderItem={renderData}
        keyExtractor={(item) => item._id}
      />
      <FloatingButton
        size={65}
        activeOpacity={0.7}
        backgroundColor={Colors.primary}
        onPress={() => onPressFloatingButton("PublicGroup", "publicgroup")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#eeeeeeee",
  },
});

export default withGroup(PublicGroup);
