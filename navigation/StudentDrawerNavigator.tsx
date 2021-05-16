import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "../screens/mainScreens/DrawerContent";
import StudentTabNavigator from "./StudentTabNavigator";
import DepartmentQuestions from "../screens/questionsScreens/DepartmentQuestions";
import UniversityQuestionsNavigator from "./UniversityQuestionsNavigator";
import SharingCenterNavigator from "./SharingCenterNavigator";
import { Colors } from "../constants/Colors";
import DepartmentGroup from "../screens/teacherScreens/DepartmentGroup";
import PublicGroupNavigator from "./MainGroups/PublicGroupNavigator";
import PrivateGroupNavigator from "./MainGroups/PrivateGroupNavigator";
import GroupNavigator from "./newNavigation/GroupNavigator";
import SettingScreen from "../screens/settings/SettingScreen";

const Drawer = createDrawerNavigator();

const StudentDrawerNavigator = (props: any) => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContentOptions={{
          activeBackgroundColor: Colors.primary,
        }}
        drawerType="slide"
        drawerContent={(props) => <DrawerContent {...props} />}
      >
        <Drawer.Screen
          name="StudentTabNavigator"
          component={StudentTabNavigator}
          options={{
            title: "Home",
          }}
        />
        <Drawer.Screen
          name="GroupNavigator"
          component={GroupNavigator}
          options={{
            title: "Hello Group Navigator",
          }}
        />

        <Drawer.Screen
          name="PrivateGroupScreen"
          component={PrivateGroupNavigator}
          options={{
            title: "Private Group",
          }}
        />

        <Drawer.Screen
          name="PublicGroupScreen"
          component={PublicGroupNavigator}
          options={{
            title: "Public Group",
          }}
        />

        <Drawer.Screen
          name="SharingCenter"
          component={SharingCenterNavigator}
          options={{
            title: "Sharing Center",
          }}
        />

        <Drawer.Screen
          name="SettingScreen"
          component={SettingScreen}
          options={{
            title: "Settings",
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default StudentDrawerNavigator;
