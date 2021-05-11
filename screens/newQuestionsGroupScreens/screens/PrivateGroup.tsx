import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchPrivateGroupData } from "../../../store/middleware/api";
import { withGroup } from "../withGroup";
import FloatingButton from "../../../components/UI/FloatingButton";
import { Colors } from "../../../constants/Colors";
import * as Animatable from "react-native-animatable";

const PrivateGroup = (props) => {
  const dispatch = useDispatch();
  const params = props.params;
  const data = useSelector((state) => {
    return state.privateGroup.data;
  });

  const departmentId = useSelector((state) => {
    return state.auth.departmentId;
  });

  const { renderData, onPressFloatingButton } = props;

  useEffect(() => {
    dispatch(
      fetchPrivateGroupData({
        departmentId: departmentId,
      })
    );
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
        onPress={() => onPressFloatingButton("PrivateGroup", "departmentgroup")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#eeeeeeee",
  },
  overlay: {
    width: "100%",
    height: "100%",
    backgroundColor: "red",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
});

export default withGroup(PrivateGroup);
