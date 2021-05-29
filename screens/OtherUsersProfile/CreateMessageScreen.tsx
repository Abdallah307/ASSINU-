import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ToastAndroid } from "react-native";
import CreatePostInput from "../../components/postComponents/CreatePostInput";
import ProfileAvatarImage from "../../components/profileComponents/ProfileAvatarImage";
import { AssinuText } from "../../components/UI/AssinuText";
import { Button } from "react-native-elements";
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import { Colors } from "../../constants/Colors";
import axios from "axios";
import HOST, { SERVER_PORT } from "../../configs/config";
import { useDispatch, useSelector } from "react-redux";
import {actions as askActions} from '../../store/Ask'

const CreateMessageScreen = (props) => {
  const [messageInput, setMessageInput] = useState("");

  const {token} = useSelector(state => state.auth)

  const createNewMessage = async () => {
    try {
        const response = await axios.post(
            `http://${HOST}:${SERVER_PORT}/user/messages/createmessage`,
            {
                receiver : props.route.params.user._id ,
                content : messageInput
            },
            {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            }
        )

        if (response.status === 201) {
            ToastAndroid.show('Message Sent Successfully', ToastAndroid.LONG)
            props.navigation.goBack()
        }
    }
    catch(err) {
        console.log(err)
    }
}



  useEffect(() => {
    console.log("saaa");
    props.navigation.setOptions({
      title: `Create Messge`,
      headerRight: () => {
        return (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                onPress={createNewMessage}
                title='Send'
                disabled={messageInput.length === 0 ? true : false}
                buttonStyle={{
                    color : Colors.primary,
                    padding : 10,
                    backgroundColor : messageInput.length === 0 ? 'lightgrey':'white',
                    borderRadius : 10
                }}
                />
            </HeaderButtons>
        )
      },
    });
  }, [messageInput]);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <ProfileAvatarImage
          imageUrl={props.route.params.user.imageUrl}
          style={styles.avatar}
        />
        <AssinuText style={{ fontSize: 18, fontFamily: "OpenSans-Bold" }}>
          To {props.route.params.user.name}
        </AssinuText>
      </View>
      <CreatePostInput
        placeholder={`Write a message ...`}
        value={messageInput}
        onChangeText={(value) => setMessageInput(value)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
  },
});

export default CreateMessageScreen;
