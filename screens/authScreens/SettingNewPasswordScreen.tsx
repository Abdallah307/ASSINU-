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

export const SettingNewPasswordScreen = (props) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isChanging , setIsChanging] = useState(false)

  const sendNewPassword = async () => {
    setIsChanging(true)
    try {
      const response = await axios.post(
        `http://${HOST}:${SERVER_PORT}/auth/forgetpassword/newpassword`,
        {
          email: props.route.params.email,
          token: props.route.params.token,
          newPassword: newPassword,
          confirmNewPassword: confirmNewPassword,
        }
      );

      if (response.status === 201) {
        setIsChanging(false)  
        ToastAndroid.show("Changed Password Successfully", ToastAndroid.LONG);
        props.navigation.navigate("SignIn");
      }
    } catch (err) {
      setIsChanging(false)  
      ToastAndroid.show("Error resetting password", ToastAndroid.LONG);
      if (err.response.status === 401) {
        ToastAndroid.show("Authentication Failed!", ToastAndroid.LONG);
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        backgroundColor: "white",
      }}
    >
      <AssinuText style={styles.createPasswordText}>
        Create new password
      </AssinuText>
      <AssinuText multiline={true} style={styles.instructionsText}>
        Your new password must be different from the previous used passwords
      </AssinuText>

      <Input
        placeholder="New Password"
        value={newPassword}
        onChangeText={(value) => setNewPassword(value)}
      />
      <Input
        placeholder="Confirm new password"
        value={confirmNewPassword}
        onChangeText={(value) => setConfirmNewPassword(value)}
      />
      <Button
        loading={isChanging}
        onPress={sendNewPassword}
        title="Reset password"
        buttonStyle={{
          padding: 15,
          borderRadius: 10,
          backgroundColor: Colors.primary,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  createPasswordText: {
    fontFamily: "OpenSans-Bold",
    fontSize: 20,
  },
  instructionsText: {
    fontSize: 13,
    width: "80%",
    marginBottom: 50,
  },
});
