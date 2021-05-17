import React, { useState, useEffect } from "react";
import { View, StyleSheet,Image, Text, ScrollView, FlatList } from "react-native";
import ProfileHeader from "../../components/profileComponents/ProfileHeader";
import { Colors } from "../../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import { fetchStudentData } from "../../store/middleware/NajahApi";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import UserProfileNavigator from "./UserProfileNavigator";
import Profile from "../Profile/Profile";
import ProfileButtons from "../Profile/ProfileButtons";
import StudentCourses from "./StudentCourses";
import { AssinuText } from "../../components/UI/AssinuText";
import { Overlay } from "react-native-elements";
import { TouchableButton } from "../Profile/TouchableButton";
import * as ImagePicker from "expo-image-picker";
import {changeProfileImage} from '../../store/middleware/api'
import HOST, { SERVER_PORT } from "../../configs/config";

const StudentUserProfile = (props) => {
  const userData = useSelector((state) => {
    return state.auth;
  });
  const dispatch = useDispatch()
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [fullImageOverlayVisible , setFullImageOverlayVisible] = useState(false)

 

  const chooseImageFromDevice = async () => {
    try {
      let value = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        //aspect: [4, 3],
        quality: 1,
      });

      if (value.cancelled) return;

      

      dispatch(changeProfileImage({
          image : value.uri 
      }))

    } catch (err) {
      console.log("error occured in choosing image");
    }
  };

  const takeImageFromCamera = async () => {
    try {
        let value = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            //aspect: [4, 3],
            quality: 1,
        });

        if (value.cancelled) return

        dispatch(changeProfileImage({
          image : value.uri 
      }))
    }
    catch(err){
      console.log("error occured in taking image");
    }
}


  return (
    <>
      <Profile
        onPressUserImage={() => setFullImageOverlayVisible(true)}
        onLongPressUserImage={() => setOverlayVisible(true)}
        setOverlayVisible={setOverlayVisible}
        overlayVisible={overlayVisible}
        imageUrl={userData.imageUrl}
        name={userData.name}
        bio={userData.departmentName}
      >
        <StudentCourses navigation={props.navigation} />
      </Profile>

      <Overlay
        animationType='fade'
        overlayStyle={styles.overlay}
        onBackdropPress={() => setOverlayVisible(false)}
        isVisible={overlayVisible}
      >
        <AssinuText>Change profile image</AssinuText>
        <TouchableButton onPress={chooseImageFromDevice} title='Choose image'/>
        <TouchableButton onPress={takeImageFromCamera} title='Take an image'/>
      </Overlay>

      <Overlay
      animationType='fade'
      overlayStyle={styles.fullImageOverlay}
      onBackdropPress={() => setFullImageOverlayVisible(false)}
      isVisible={fullImageOverlayVisible}
      >
        <Image
        source={{
          uri : `http://${HOST}:${SERVER_PORT}/${userData.imageUrl}`
        }}
        style={styles.fullProfileImage}
        />
      </Overlay>

    </>
  );
};

const styles = StyleSheet.create({
    overlay: {
        width: "70%",
        padding: 20,
      },
      fullProfileImage : {
        width : '100%',
        aspectRatio : 1 / 1
      },
      fullImageOverlay : {
        width : '100%',
        height : '100%',
        alignItems : 'center',
        justifyContent : 'center',
      }
})

export const options = ({ route, navigation }) => ({
  title: "الحساب",
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title="List"
        iconName="list"
        onPress={() => navigation.openDrawer()}
      />
    </HeaderButtons>
  ),
});

export default StudentUserProfile;
