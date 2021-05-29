import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, ToastAndroid } from "react-native";
import { Input } from "react-native-elements";
import HOST, { SERVER_PORT } from "../../configs/config";
import { Colors } from "../../constants/Colors";
import { Button } from "react-native-elements";
import { actions as authActions } from "../../store/auth";
import { useDispatch } from "react-redux";
import { AssinuText } from "../../components/UI/AssinuText";
import CustomActivityIndicator from "../../components/UI/CustomActivityIndicator";

export const ForgetPasswordScreenCodeScreen = (props) => {
  const [verficationCode, setVerficationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage , setErrorMessage] = useState('')

  const sendVerificationCode = async () => {
      setIsVerifying(true)
    try {
      const response = await axios.post(
        `http://${HOST}:${SERVER_PORT}/auth/forgetpassword/verification`,
        {
          code: verficationCode,
          email: props.route.params.email,
        }
      );

      if (response.status === 200) {
          setIsVerifying(false)
        props.navigation.navigate("SettingPasswordScreen", {
          token: response.data.token,
          email : props.route.params.email
        });
      }
    } catch (err) {
        setErrorMessage('Verification code is not correct!')
        setIsVerifying(false)
      ToastAndroid.show("Error Occured", ToastAndroid.LONG);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Input
        errorMessage={errorMessage}
        placeholder="Enter verification code"
        keyboardType="numeric"
        maxLength={6}
        textAlign="center"
        value={verficationCode}
        onChangeText={(value) => setVerficationCode(value)}
      />
      <Button
        loading={isVerifying}
        onPress={sendVerificationCode}
        title="Verify"
        disabled={
          verficationCode.length === 0 || verficationCode.length < 6
            ? true
            : false
        }
        buttonStyle={{
          padding: 15,
          borderRadius: 10,
          backgroundColor: Colors.primary,
        }}
      />
    </View>
  );
};
