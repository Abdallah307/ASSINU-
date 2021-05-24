import React, { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { OptionsOverlay } from "../../../components/UI/OptionsOverlay";
import { fetchUserSharedItems } from "../../../store/middleware/api";
import { TouchableButton } from "../../Profile/TouchableButton";
import ShopItem from "../components/ShopItem";

const MySharedItemsScreen = (props) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.sharingCenter.myItems);
  const [overlayVisible , setOverlayVisible] = useState(false)

  useEffect(() => {
    dispatch(fetchUserSharedItems());
  }, []);

  return (
    <View style={styles.mainContainer}>
      <FlatList
        numColumns={2}
        data={items}
        renderItem={({ item }) => {
          return (
            <ShopItem
              onLongPress={() => setOverlayVisible(true)}
              imageUrl={item.imageUrl}
              title={item.title}
              price={item.price}
            />
          );
        }}
        keyExtractor={(item) => item._id}
      />
      <OptionsOverlay
       onBackdropPress={() => setOverlayVisible(false)} 
       animationType="slide"
       overlayStyle={styles.overlay}
       isVisible={overlayVisible}
       >
        <TouchableButton onPress={() => {}} title="Edit" />
        <TouchableButton onPress={() => {}} title="Delete" />
      </OptionsOverlay>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  overlay: {
    width: "100%",
    padding: 20,
    position : 'absolute',
    bottom : 0
  },
});

export default MySharedItemsScreen;
