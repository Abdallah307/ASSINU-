import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import CreatePostInput from "../../components/postComponents/CreatePostInput";
import ProfileAvatarImage from "../../components/profileComponents/ProfileAvatarImage";
import { AssinuText } from "../../components/UI/AssinuText";
import { Button } from "react-native-elements";
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import { Colors } from "../../constants/Colors";
import axios from "axios";
import HOST, { SERVER_PORT } from "../../configs/config";
import { useSelector } from "react-redux";

const CreateAskQuestionScreen = (props) => {
  const [questionInput, setQuestionInput] = useState("");

  const {token} = useSelector(state => state.auth)

  const submitQuestion = async () => {
      try {
        const response = await axios.post(
            `http:${HOST}:${SERVER_PORT}/ask/askquestion`,
            {
                question : questionInput,
                receiver : props.route.params.student._id 
            },
            {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            }
        )

        if (response.status  === 201) {
            console.log(response.data.question)
            props.navigation.goBack()
        }
      }
      catch( err) {
          console.log(err)
      }
  }



  useEffect(() => {
    console.log("maaa");
    props.navigation.setOptions({
      title: `Ask ${props.route.params.student.name}`,
      headerRight: () => {
        return (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                onPress={submitQuestion}
                title='Ask'
                disabled={questionInput.length === 0 ? true : false}
                buttonStyle={{
                    color : Colors.primary,
                    padding : 10,
                    backgroundColor : questionInput.length === 0 ? 'lightgrey':'white',
                    borderRadius : 10
                }}
                />
            </HeaderButtons>
        )
      },
    });
  }, [questionInput]);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <ProfileAvatarImage
          imageUrl={props.route.params.student.imageUrl}
          style={styles.avatar}
        />
        <AssinuText style={{ fontSize: 18, fontFamily: "OpenSans-Bold" }}>
          To {props.route.params.student.name}
        </AssinuText>
      </View>
      <CreatePostInput
        placeholder={`Ask ${props.route.params.student.name} about somthing ...`}
        value={questionInput}
        onChangeText={(value) => setQuestionInput(value)}
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

export default CreateAskQuestionScreen;
