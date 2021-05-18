import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import ListItem from "../../components/UI/ListItem";
import HOST, { SERVER_PORT } from "../../configs/config";

const AvailableGroupsScreen = (props) => {
  const { departmentName, token, userType, departmentId } = useSelector(
    (state) => state.auth
  );

  const [departmentStudentsGroupMembers, setDepartmentStudentsGroupMembers] =
    useState([]);

  const [departmentTeachersGroupMembers, setDepartmentTeachersGroupMembers] =
    useState([]);

  const [universityGroupMembers, setUniversityGroupMembers] = useState([]);

  const fetchDepartmentStudentsGroupMembers = async () => {
    try {
      const response = await axios.get(
        `http://${HOST}:${SERVER_PORT}/api/najah/department/students/${departmentId}/members`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.status === 200) {
        setDepartmentStudentsGroupMembers(response.data.members);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDepartmentTeachersGroupMembers = async () => {
    try {
        const response = await axios.get(
            `http://${HOST}:${SERVER_PORT}/api/najah/department/${departmentId}/all/members`,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
    
          if (response.status === 200) {
            setDepartmentTeachersGroupMembers(response.data.members);
          }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUniversityGroupMembers = async () => {
    try {
      const response = await axios.get(
        `http://${HOST}:${SERVER_PORT}/api/najah/allstudents`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.status === 200) {
        setUniversityGroupMembers(response.data.members);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (userType === "student") {
      fetchDepartmentStudentsGroupMembers();
      fetchUniversityGroupMembers();
    }
    fetchDepartmentTeachersGroupMembers()
  }, []);

  return (
    <View style={styles.container}>
      {userType === "student" && (
        <>
          <ListItem
            title={`طلاب ${departmentName}`}
            onSelect={() => {
              props.navigation.navigate("GroupNavigator", {
                showChattingButton: false,
                numberOfMembers: departmentStudentsGroupMembers.length,
                id: departmentId,
                title:`طلاب ${departmentName}`,
                groupMembers: departmentStudentsGroupMembers,
              });
            }}
          />
          <ListItem
            title="طلاب جامعة النجاح الوطنية"
            onSelect={() => {
              props.navigation.navigate("GroupNavigator", {
                showChattingButton: false,
                numberOfMembers: universityGroupMembers.length,
                id: "609ef8bd145ffdd7a70e0d95",
                title: "طلاب جامعة النجاح الوطنية",
                groupMembers: universityGroupMembers,
              });
            }}
          />
        </>
      )}
      <ListItem 
      title={`ملتقى ${departmentName}`} 
      onSelect={() => {
        props.navigation.navigate("GroupNavigator", {
          showChattingButton: false,
          numberOfMembers: departmentTeachersGroupMembers.length,
          id: departmentId,
          title: `ملتقى ${departmentName}`,
          groupMembers: departmentTeachersGroupMembers,
        });
      }}
      />
    </View>
  );
};

export default AvailableGroupsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
