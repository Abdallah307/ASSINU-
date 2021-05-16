import React from "react";
import { View, StyleSheet, TouchableOpacity, Button } from "react-native";
import { Colors } from "../../constants/Colors";
import ProfileHeader from "./ProfileHeader";
import ProfileBody from "./ProfileBody";
import { Overlay } from "react-native-elements";
import { AssinuText } from "../../components/UI/AssinuText";
import { TouchableButton } from "./TouchableButton";

const Profile = (props) => {
  return (
    <View style={styles.container}>
      <ProfileHeader
        onPressUserImage={props.onPressUserImage}
        onLongPressUserImage={props.onLongPressUserImage}
        imageUrl={props.imageUrl}
        name={props.name}
        bio={props.bio}
      />
      {props.profileButtons}
      <ProfileBody>{props.children}</ProfileBody>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  upperContainer: {
    backgroundColor: Colors.primary,
    height: "40%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  name: {
    fontFamily: "OpenSans-Bold",
    fontSize: 16,
    color: "white",
  },
  bio: {
    color: "#eeeeee",
  },
  profileBody: {
    flex: 1,
    marginTop: 10,
  },
  buttonsContainer: {
    backgroundColor: "white",
    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 80,
  },
  buttonTitle: {
    fontFamily: "OpenSans-Bold",
  },
  buttonStyle: {
    flexDirection: "column",
  },
 
});

export default Profile;
