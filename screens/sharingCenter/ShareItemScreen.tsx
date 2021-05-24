import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Platform,
  TextInput,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Button, Input } from "react-native-elements";
import ImageHeader from "../../components/sharingCenterComponents/ImageHeader";
import { Colors } from "../../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import HOST, { SERVER_PORT } from "../../configs/config";
import { useDispatch, useSelector } from "react-redux";
import DropDownPicker from "react-native-dropdown-picker";
import {shareItemInSharingCenter} from '../../store/middleware/api'

const ShareItemScreen = (props) => {
  const [image, setImage] = useState();
  const [itemName, setItemName] = useState("");
  const [itemDetails, setItemDetails] = useState("");
  const [result, setResult] = useState();
  const [price, setPrice] = useState<Number>(0);

  const dispatch = useDispatch()

  const [isSharing, setIsSharing] = useState(false);

  const [shareLocation, setShareLocation] = useState("public");

  const { userId, token, departmentId } = useSelector((state) => {
    return state.auth;
  });

  const takeImageFromCamera = async () => {
    try {
      let value = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (value.cancelled) return;

      setResult(value);
      setImage(value.uri);
    } catch (err) {}
  };

  const chooseImageFromDevice = async () => {
    try {
      let value = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (value.cancelled) return;

      setResult(value);
      setImage(value.uri);
    } catch (err) {}
  };

  const uploadPhotoAsync = async () => {
    setIsSharing(true);

    if (result.cancelled) {
      return;
    }

    let localUri = result.uri;
    let filename = localUri.split("/").pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    dispatch(shareItemInSharingCenter({
        title : itemName,
        details : itemDetails,
        price : price,
        imageData : { uri: localUri, name: filename, type },
        shareLocation : shareLocation
    }))
    if (shareLocation === 'public')
    props.navigation.navigate('Public')
    else props.navigation.navigate('SharingDepartment')

    // let formData = new FormData();

    // formData.append("imageUrl", { uri: localUri, name: filename, type });
    // formData.append("title", itemName);
    // formData.append("details", itemDetails);
    // formData.append("price", price);

    // shareLocation === "department"
    //   ? formData.append("departmentId", departmentId)
    //   : null;

    // const response = await axios.post(
    //   `http:${HOST}:${SERVER_PORT}/sharingcenter/${shareLocation}/shareitem`,
    //   formData,
    //   {
    //     headers: {
    //       "content-type": "multipart/form-data",
    //       Authorization: "Bearer " + token,
    //     },
    //   }
    // );

    // if (response.status === 201) {
    //   setIsSharing(false);
    //   console.log(response.data.item);
    //   if (shareLocation === "public") {
    //     props.navigation.navigate("Public", {
    //       item: response.data.item,
    //     });
    //   } else {
    //     props.navigation.navigate("SharingDepartment", {
    //       item: response.data.item,
    //     });
    //   }
    // }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback
        style={{ flex: 1 }}
        onPress={() => Keyboard.dismiss()}
      >
        <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.title}>Create item</Text>
            <DropDownPicker
              placeholder="Share to..."
              items={[
                { label: "Public", value: "public" },
                { label: "Department", value: "department" },
              ]}
              containerStyle={{ height: 30, flex: 1, borderWidth: 0 }}
              onChangeItem={(item) => {
                setShareLocation(item.value);
              }}
            />
          </View>
          <ImageHeader
            takeImage={takeImageFromCamera}
            chooseImage={chooseImageFromDevice}
            image={image}
          >
            <Button
              title="Take an image"
              onPress={takeImageFromCamera}
              buttonStyle={styles.imageButton}
            />
            <Button
              title="Choose..."
              onPress={chooseImageFromDevice}
              buttonStyle={styles.imageButton}
            />
          </ImageHeader>
          <View
            style={{
              flex: 1,
              paddingBottom: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Input
              label="Item name"
              labelStyle={styles.inputLabel}
              placeholder="Item name"
              inputContainerStyle={styles.input}
              value={itemName}
              onChangeText={(value) => setItemName(value)}
            />
            <Input
              keyboardType="numeric"
              label="Price (do not fill it if free)"
              labelStyle={styles.inputLabel}
              placeholder="Price"
              inputContainerStyle={styles.input}
              value={price}
              onChangeText={(value) => setPrice(value)}
            />
            <Input
              label="Details"
              labelStyle={styles.inputLabel}
              placeholder="Details"
              inputContainerStyle={styles.input}
              multiline={true}
              value={itemDetails}
              onChangeText={(value) => setItemDetails(value)}
            />
            <Button
              disabled={
                itemName.length === 0 || itemDetails.length === 0 || !image
              }
              title="Share"
              onPress={uploadPhotoAsync}
              buttonStyle={styles.submitButton}
              loading={isSharing}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 5,
    marginVertical: 5,
    borderRadius: 15,
  },
  title: {
    fontFamily: "OpenSans-Bold",
    fontSize: 25,
    flex: 2,
    marginBottom: 5,
    padding: 5,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 15,
  },
  inputLabel: {
    color: Colors.primary,
  },
  imageButton: {
    backgroundColor: Colors.primary,
    borderRadius: 15,
    padding: 15,
  },
});

export default ShareItemScreen;
