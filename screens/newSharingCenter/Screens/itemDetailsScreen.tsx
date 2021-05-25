import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { AssinuText } from "../../../components/UI/AssinuText";
import ItemImage from "../components/ItemImage";
import { Button } from "react-native-elements";
import { Colors } from "../../../constants/Colors";
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
        titleStyle={{ color: Colors.pur3,  }}
        buttonStyle={styles.messageButton}
        containerStyle={styles.buttonContainer}
      />
      <View style={styles.titleContainer2}>
        <AssinuText style={styles.title}>Details</AssinuText>
      </View>
      <View
        style={{
          padding: 10,
          borderColor: "grey",
          paddingBottom: 20,
        }}
      >
        <Text style={{ fontFamily: "OpenSans-Regular", fontSize: 15, paddingLeft:10 }}>
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
  titleContainer2:{
   // margingTop:20,
    paddingLeft:20,
    //borderBottomWidth:1,
    borderBottomColor:Colors.primary,
    //margingVertical:10,
  },
  title: {
    fontFamily: "OpenSans-Bold",
    fontSize: 20,
  },
  messageButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'transparent',
    
  },
  buttonContainer: {
    marginBottom:40,
    margin: 20,
    //marginTop:10,
    borderBottomWidth:0.5,
    borderLeftWidth:0.5,
    borderColor:Colors.greyb,

  },
});

export default ItemDetailsScreen;
