import { Entypo } from "@expo/vector-icons";
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import ProfileAvatarImage from "../../../components/profileComponents/ProfileAvatarImage";
import moment from 'moment'

const FeedPostHeader = (props) => {

  const checkDate = (date) => {
    let hours = moment().diff(moment(date), "hours");
    let days = moment().diff(moment(date), "days");

    // console.log(`hours : ${hours}`);
    // console.log(`days : ${days} `);



    if (hours <= 23) {
      return `${hours - moment().diff(moment(date), "hours") +1} hours ago`;
    }

    if (days <= 7) {
      return `${days+1} days ago`
    }

    return date 
  };


  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={props.onPressHeader}>
        <View style={styles.info}>
          <ProfileAvatarImage
            imageUrl={props.imageUrl}
            style={styles.profileImage}
          />

          <View style={styles.dataInfo}>
            <Text style={styles.username}>{props.groupName}</Text>
            <Text style={styles.timestamp}>{props.name}</Text>
            <Text style={styles.timestamp}>
            {checkDate(new Date(props.date).toDateString())}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      {props.showOptions && (
        <Entypo
          onPress={props.onPressOptionsButton}
          style={{ marginLeft: "auto" }}
          name="dots-three-horizontal"
          size={24}
          color="black"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    paddingHorizontal: 7,
    paddingVertical: 7,
    backgroundColor: "white",
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    fontSize: 14,
    fontFamily: "OpenSans-Bold",
  },
  timestamp: {
    fontSize: 12,
    color: "grey",
    fontFamily: "OpenSans-Light",
  },
});

export default FeedPostHeader;
