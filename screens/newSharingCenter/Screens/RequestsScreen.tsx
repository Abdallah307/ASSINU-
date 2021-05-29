import React, { useEffect } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchSharingCenterMyRequests } from "../../../store/middleware/api";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MyRequestsScreen from "./MyRequestsScreen";
import OtherRequestsScreen from "./OtherRequestsScreen";

const Tab = createMaterialTopTabNavigator();

const RequestsScreen = (props) => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Sent" component={MyRequestsScreen} />
      <Tab.Screen name="Received" component={OtherRequestsScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});

export default RequestsScreen;
