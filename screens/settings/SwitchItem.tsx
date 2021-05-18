import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Switch, SwitchProps } from "react-native-elements";



const SwitchItem = (props) => {
  return (
    <View style={styles.switchItem}>
      <Text style={{ fontSize: 20 }}>{props.switchTitle}</Text>
      <Switch
        onValueChange={props.onValueChange}
        value={props.switchValue}
        color={props.switchColor}
      />
    </View>
  );
};

export default SwitchItem;

const styles = StyleSheet.create({
    switchItem : {
        justifyContent : 'space-between',
        flexDirection : 'row',
        alignItems : 'center',
        marginBottom : 45
    }
});
