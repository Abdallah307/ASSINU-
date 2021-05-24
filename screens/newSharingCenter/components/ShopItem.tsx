import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { AssinuText } from "../../../components/UI/AssinuText";
import HOST, { SERVER_PORT } from "../../../configs/config";
import ItemImage from "./ItemImage";

const ShopItem = (props) => {
  return (
    <TouchableOpacity onLongPress={props.onLongPress} onPress={props.onPress} activeOpacity={0.6} style={{ flex: 1 }}>
      <View style={styles.shopItem}>
        <ItemImage
        imageUrl={props.imageUrl}
        />
        <View style={styles.itemInfoContainer}>
          <AssinuText numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
            {props.title}
          </AssinuText>
          <AssinuText ellipsizeMode="tail" style={styles.price}>
            {props.price === 0 ? "Free" : `${props.price}$`}
          </AssinuText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shopItem: {
    flex: 1,
    backgroundColor: "white",
    elevation: 5,
    margin: 10,
    overflow: "hidden",
    borderRadius: 10,
  },
  itemImageContainer: {
    width: "100%",
    aspectRatio: 4 / 3,
  },
  itemInfoContainer: {
    padding: 10,
  },
  itemImage: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontFamily: "OpenSans-Bold",
    fontSize: 16,
    width: "80%",
  },
  price: {
    fontFamily: "OpenSans-Bold",
    fontSize: 13,
    color: "red",
  },
});

export default ShopItem;
