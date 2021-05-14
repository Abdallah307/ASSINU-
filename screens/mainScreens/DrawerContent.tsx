import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/Colors";

import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import ProfileAvatarImage from "../../components/profileComponents/ProfileAvatarImage";
import {
  AntDesign,
  FontAwesome,
  Feather,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { actions as authActions } from "../../store/auth";

const DrawerContent = (props) => {
  const dispatch = useDispatch();

  const { imageUrl, name, departmentName, departmentId } = useSelector(
    (state) => state.auth
  );

  return (
    <DrawerContentScrollView {...props}>
      <View style={{ flex: 1 }}>
        <View style={styles.userInfo}>
          <ProfileAvatarImage imageUrl={imageUrl} style={styles.userImage} />
          <View>
            <Text style={styles.username}>{name}</Text>
          </View>
        </View>
      </View>
      <DrawerItem
        icon={() => <AntDesign name="home" size={20} color={Colors.primary} />}
        onPress={() => props.navigation.navigate("Feed")}
        label="Home"
      />

      <DrawerItem
        icon={() => (
          <MaterialCommunityIcons
            name="head-question"
            size={20}
            color={Colors.primary}
          />
        )}
        onPress={() => props.navigation.navigate("Ask")}
        label="My ASK"
      />

      <DrawerItem
        icon={() => (
          <FontAwesome name="user-o" size={20} color={Colors.primary} />
        )}
        onPress={() => props.navigation.navigate("StudentProfile")}
        label="Profile"
      />

      <DrawerItem
        icon={() => (
          <FontAwesome name="university" size={20} color={Colors.primary} />
        )}
        onPress={() => props.navigation.navigate("PublicGroupScreen")}
        label={() => <Text>طلاب جامعة النجاح Group</Text>}
      />

      <DrawerItem
        icon={() => (
          <MaterialIcons
            name="question-answer"
            size={20}
            color={Colors.primary}
          />
        )}
        onPress={() =>
          props.navigation.navigate("GroupNavigator", {
            showChattingButton: false,
            numberOfMembers: 50,
            id: departmentId,
            title: "طلاب هندسة الحاسوب",
          })
        }
        label={() => <Text>طلاب {departmentName} Group</Text>}
      />

      <DrawerItem
        icon={() => (
          <FontAwesome name="exchange" size={20} color={Colors.primary} />
        )}
        onPress={() => {
          props.navigation.navigate("SharingCenter");
        }}
        label="Sharing Center"
      />

      <DrawerItem
        style={{ borderBottomWidth: 0.6 }}
        icon={() => (
          <Feather name="settings" size={20} color={Colors.primary} />
        )}
        onPress={() => {}}
        label="Settings"
      />

      <DrawerItem
        icon={() => (
          <MaterialIcons name="logout" size={20} color={Colors.primary} />
        )}
        onPress={() => {
          dispatch(authActions.signout({}));
        }}
        label="Logout"
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 0.8,
    paddingHorizontal: 20,
    borderColor: "grey",
    backgroundColor: Colors.primary,
  },
  username: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  bio: {
    fontSize: 11,
    color: "white",
    fontWeight: "bold",
  },
});

export default DrawerContent;
