import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { AssinuText } from "../../../components/UI/AssinuText";
import ItemImage from "../components/ItemImage";
import { Button } from "react-native-elements";
const ItemDetailsScreen = (props) => {
  const params = props.route.params;
  return (
    <ScrollView style={styles.mainContainer}>
      <ItemImage imageUrl={params.item.imageUrl} />
      <View style={styles.titleContainer}>
        <AssinuText style={styles.title}>{params.item.title}</AssinuText>
      </View>
      <Button
        onPress={() => {
          props.navigation.navigate('RequestItemScreen', {
            item : params.item,
          })
        }}
        title="Request it from owner"
        buttonStyle={styles.messageButton}
        containerStyle={styles.buttonContainer}
      />
      <View style={styles.titleContainer}>
        <AssinuText style={styles.title}>Details</AssinuText>
      </View>
      <View
        style={{
          padding: 10,
          borderColor: "grey",
          paddingBottom: 20,
        }}
      >
        <Text style={{ fontFamily: "OpenSans-Regular", fontSize: 15 }}>
          {params.item.details}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "OpenSans-Bold",
    fontSize: 20,
  },
  messageButton: {
    padding: 15,
    borderRadius: 10,
  },
  buttonContainer: {
    margin: 20,
  },
});

export default ItemDetailsScreen;
