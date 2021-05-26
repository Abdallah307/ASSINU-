import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { Colors } from "../../constants/Colors";
import ListItem from "../../components/UI/ListItem";
import CustomActivityIndicator from "../../components/UI/CustomActivityIndicator";
import { fetchStudentData } from "../../store/middleware/NajahApi";
import { useSelector, useDispatch } from "react-redux";
import { AssinuText } from "../../components/UI/AssinuText";

const CommonCourses = (props) => {
  const [refreshing, setRefresh] = useState(false);

  const dispatch = useDispatch();

  const userData = useSelector((state) => {
    return state.auth;
  });

  const openCourseGroup = (itemData) => {
    const item = itemData.item;
    props.navigation.navigate("GroupScreen", {
      title: item.name,
      id: item._id,
      userImage: userData.imageUrl,
      numberOfMembers: item.students.length,
      userId: userData.userId,
      username: userData.name,
      showChattingButton: true,
      students: itemData.item.students,
      groupType: "normal",
    });
  };

  const renderItems = (itemData) => {
    return (
      <ListItem
        onSelect={() => openCourseGroup(itemData)}
        title={itemData.item.name}
      />
    );
  };

  return (
    <FlatList
      ListHeaderComponent={() => {
        return (
          <View style={{justifyContent : 'center', alignItems : 'center'}}>
            <AssinuText style={{fontSize:18, fontFamily :'OpenSans-Bold'}}>Common courses</AssinuText>
          </View>
        );
      }}
      numColumns={2}
      contentContainerStyle={{ padding: 20 }}
      data={props.courses}
      renderItem={renderItems}
      keyExtractor={(item) => item._id.toString()}
      refreshing={refreshing}
      onRefresh={() => {}}
    />
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: "white",
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontFamily: "OpenSans-Bold",
  },
});

export default CommonCourses;