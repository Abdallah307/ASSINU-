import React, { useLayoutEffect } from "react";
import { View, StyleSheet,Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { StackNavigationOptions } from "@react-navigation/stack";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import { Colors } from "../../constants/Colors";
import { Octicons } from "@expo/vector-icons";

import { MaterialIcons } from "@expo/vector-icons";

import DepartmentSharingCenter from "../newSharingCenter/Screens/DepartmentSharingCenter";
import PublicSharingCenter from "../newSharingCenter/Screens/PublicSharingCenter";
import MySharedItemsScreen from "../newSharingCenter/Screens/MySharedItemsScreen";
import RequestsScreen from "../newSharingCenter/Screens/RequestsScreen";

const Tab = createMaterialTopTabNavigator();

const SharingCenter = (props) => {
  return (
    
    <Tab.Navigator
    >
    
      <Tab.Screen
        options={{
          title: "Items shared by departement students",
        }}
        name="SharingDepartment"
        component={DepartmentSharingCenter}
      />
      <Tab.Screen
        name="Public"
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="public" size={24} color="black" />
          ),
        }}
        component={PublicSharingCenter}
      />

      <Tab.Screen
        name="MyItemsScreen"
        options={{
          title: "Items shared by me",
        }}
        component={MySharedItemsScreen}
      />

      <Tab.Screen
        name="SharingCenterChat"
        options={{
          title: "Sharing Center messages",
        }}
        component={RequestsScreen}
      />
    </Tab.Navigator>
  );
};

export const screenOptions = ({ navigation, route }) => ({
  title: "Sharing center",
  headerRight: () => {
    return (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          iconName="md-add-circle"
          onPress={() => navigation.navigate("ShareItemScreen")}
        />
      </HeaderButtons>
    );
  },
});

const styles = StyleSheet.create({});

export default SharingCenter;
