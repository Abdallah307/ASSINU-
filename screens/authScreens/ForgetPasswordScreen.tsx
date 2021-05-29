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

export const ForgetPasswordScreen = (props) => {
  const [email, setEmail] = useState("");
  const [isSending , setIsSending] = useState(false);

  const submitEmail = async () => {
      setIsSending(true)
      try {
        const response = await axios.post(
            `http://${HOST}:${SERVER_PORT}/auth/forgetpassword/sendcode`,
            {
                email : email 
            }
        )

        if (response.status === 200) {
            setIsSending(false)
            props.navigation.navigate('ForgetPasswordCodeScreen', {
                email : email 
            })
        }

      }
      catch(err) {
          setIsSending(false)
          ToastAndroid.show('Error occured', ToastAndroid.LONG)
      }
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        backgroundColor: "white",
      }}
    >
      <AssinuText style={styles.resetPasswordText}>Reset password</AssinuText>
      <AssinuText multiline={true} style={styles.instructionsText}>
        Enter the email associated with your account and we'll send an email
        with the instructions to reset your password
      </AssinuText>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Input
          placeholder="Enter your email.."
          value={email}
          onChangeText={(value) => setEmail(value)}
          keyboardType="email-address"
        />
        <Button
          disabled={email.length === 0}
          loading={isSending}
          onPress={submitEmail}
          title="Send"
          buttonStyle={{
            padding: 15,
            borderRadius: 10,
            backgroundColor: Colors.primary,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  resetPasswordText: {
    fontFamily: "OpenSans-Bold",
    fontSize: 20,
  },
  instructionsText: {
    fontSize: 13,
    width: "80%",
    marginBottom: 50,
  },
});
