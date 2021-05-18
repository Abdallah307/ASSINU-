import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TeacherTabNavigator from "./TeacherTabNavigator";
import TeacherDrawerContent from "../screens/mainScreens/TeacherDrawerContent";
import { Colors } from "../constants/Colors";
import AskStackNavigator from "./AskStackNavigator";
import SettingsNavigator from "./SettingsNavigator";

const Drawer = createDrawerNavigator();

const TeacherDrawerNavigator = (props) => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="TeacherTabNavigator"
        drawerContentOptions={{
          activeBackgroundColor: Colors.primary,
        }}
        drawerType="slide"
        drawerContent={(props) => <TeacherDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="TeacherTabNavigator"
          component={TeacherTabNavigator}
        />
        <Drawer.Screen name="AskStackNavigator" component={AskStackNavigator} />
        <Drawer.Screen
          name="SettingsNavigator"
          component={SettingsNavigator}
          options={{
            title: "Settings",
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default TeacherDrawerNavigator;
