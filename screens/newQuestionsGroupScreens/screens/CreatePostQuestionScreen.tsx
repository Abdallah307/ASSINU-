import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ImageBackground,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CreatePostInput from "../../../components/postComponents/CreatePostInput";
import ProfileAvatarImage from "../../../components/profileComponents/ProfileAvatarImage";
import { AssinuText } from "../../../components/UI/AssinuText";
import Header from "../components/Header";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../../components/UI/CustomHeaderButton";
import { Colors } from "../../../constants/Colors";
import DropDownPicker from "react-native-dropdown-picker";
import { Button } from "react-native-elements";
import { AntDesign, Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import HOST, { SERVER_PORT } from "../../../configs/config";
import axios from "axios";
import { actions as publicGroupActions } from "../../../store/PublicGroup";
import { actions as privateGroupActions } from "../../../store/PrivateGroup";
import {actions as groupActions} from '../../../store/Group'
import { CourseGroup } from "../../../api/api";
import { socket } from "../../../socket";

const CreatePostQuestionScreen = (props) => {
  const dispatch = useDispatch();
 
  const [inputValue, setInputValue] = useState("");
  const [image, setImage] = useState(null);
  const [result, setResult] = useState();
  const [shareType, setShareType] = useState("post");

  const params = props.route.params;
  const { name, imageUrl, token } = useSelector((state) => {
    return state.auth;
  });


  React.useEffect(() => {
    console.log("oh shit here we go again");
    props.navigation.setOptions({
      headerRight: () => {
        return (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            {inputValue.length == 0 ? (
              <Item
                title="post"
                disabled={true}
                buttonStyle={{
                  backgroundColor: "lightgrey",
                  padding: 10,
                  color: Colors.primary,
                  borderRadius: 10,
                }}
              />
            ) : (
              <Item
                title="Post"
                buttonStyle={{
                  backgroundColor: "white",
                  padding: 10,
                  color: Colors.primary,
                  borderRadius: 10,
                }}
                onPress={uploadPhotoAsync}
              />
            )}
          </HeaderButtons>
        );
      },
    });
  }, [inputValue, image]);

  const chooseImageFromDevice = async () => {
    try {
      let value = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        //aspect: [4, 3],
        quality: 1,
      });

      if (value.cancelled) return;

      setImage(value.uri);
    } catch (err) {
      console.log("error occured in choosing image");
    }
  };

  const uploadPhotoAsync = async () => {

    let formData = new FormData();
    
    if (image) {
      let localUri = image;
      let filename = localUri.split("/").pop();

      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      formData.append("imageUrl", { uri: localUri, name: filename, type });
    }
    formData.append("content", inputValue);
    formData.append('groupId', params.groupId)
    let members = []
    if (!params.groupMembers) {
      const result = await CourseGroup.fetchGroupMembers(params.groupId, token)
      members = result.data.members.map(member => {
        return member._id
      })
    }
    else {
      members = params.groupMembers.map(member => {
        return member._id 
      })
    }
    
    formData.append('members', JSON.stringify(members))
    formData.append('groupName', params.groupName)
    formData.append('username', params.username)
    formData.append('groupType', params.groupType)
    
    try {
      const response = await axios.post(
        `http://${HOST}:${SERVER_PORT}/group/create${shareType}`,
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.status === 201) {
       if (shareType === 'post') {
         dispatch(groupActions.CREATE_POST({
           post : response.data.post 
         }))
       }
       else if (shareType === 'question') {
         dispatch(groupActions.CREATE_QUESTION({
           question : response.data.question
         }))
       } 
       
        props.navigation.goBack();
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <ProfileAvatarImage
          style={{ width: 40, height: 40, borderRadius: 20 }}
          imageUrl={imageUrl}
        />
        <AssinuText style={styles.name}>{name}</AssinuText>
        <DropDownPicker
          placeholder={shareType.toString()}
          items={[
            { label: "post", value: "post" },
            { label: "question", value: "question" },
          ]}
          containerStyle={{ height: 40, flex: 1, borderWidth: 0 }}
          onChangeItem={(item) => {
            setShareType(item.value);
          }}
        />
        <Button
          type="clear"
          containerStyle={{ marginRight: "auto" }}
          icon={<Feather name="image" size={27} color={Colors.blueGreen} />}
          onPress={chooseImageFromDevice}
        />
      </View>
      <CreatePostInput content={inputValue} onChangeText={setInputValue} />
      {image && (
        <View style={styles.postImageContainer}>
          <ImageBackground
            style={{ width: "100%", aspectRatio: 4 / 3 }}
            source={{
              uri: image,
            }}
          >
            <Button
              onPress={() => setImage(null)}
              type="clear"
              containerStyle={styles.imageRemoveButton}
              icon={
                <AntDesign name="delete" size={24} color={Colors.primary} />
              }
            />
          </ImageBackground>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  name: {
    fontSize: 13,
    fontFamily: "OpenSans-Bold",
    marginRight : 10
  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    fontFamily: "OpenSans-Regular",
    fontSize: 18,
    flex: 1,
  },
  postImageContainer: {
    flex: 1,
  },
  imageRemoveButton: {
    position: "absolute",
    top: 0,
    right: 10,
  },
});

export default CreatePostQuestionScreen;
