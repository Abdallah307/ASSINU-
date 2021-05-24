import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ShareItemScreen from "../screens/sharingCenter/ShareItemScreen";
import SharingCenter, {
  screenOptions as sharingCenterOptions,
} from "../screens/sharingCenter/SharingCenter";
import { Colors } from "../constants/Colors";
import ItemDetailsScreen from "../screens/newSharingCenter/Screens/itemDetailsScreen";
import RequestItemScreen from "../screens/newSharingCenter/Screens/RequestItemScreen";
import RequestChatScreen from "../screens/newSharingCenter/Screens/RequestChatScreen";
const Stack = createStackNavigator();

const SharingCenterNavigator = (props: any) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontFamily: "OpenSans-Bold",
        },
        headerTitleAlign: "center",
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: Colors.primary,
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      <Stack.Screen
        options={sharingCenterOptions}
        name="SharingCenter"
        component={SharingCenter}
      />

      <Stack.Screen
        options={{
          title: "Details",
        }}
        name="ItemDetailsScreen"
        component={ItemDetailsScreen}
      />

      <Stack.Screen
        options={{
          title: "Share item",
        }}
        name="ShareItemScreen"
        component={ShareItemScreen}
      />

      <Stack.Screen
        options={{
          title: "Request item",
        }}
        name="RequestItemScreen"
        component={RequestItemScreen}
      />

      <Stack.Screen
        options={{
          title: "Request Chat",
        }}
        name="RequestChatScreen"
        component={RequestChatScreen}
      />
    </Stack.Navigator>
  );
};

export default SharingCenterNavigator;
