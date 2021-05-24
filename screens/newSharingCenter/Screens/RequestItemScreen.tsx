import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch } from "react-redux";
import CreatePostInput from "../../../components/postComponents/CreatePostInput";
import ProfileAvatarImage from "../../../components/profileComponents/ProfileAvatarImage";
import { AssinuText } from "../../../components/UI/AssinuText";
import CustomHeaderButton from "../../../components/UI/CustomHeaderButton";
import { Colors } from "../../../constants/Colors";
import {requestItemFromOwner} from '../../../store/middleware/api'

const RequestItemScreen = (props) => {
  const params = props.route.params;

  const [message, setMessage] = useState("");
  const dispatch = useDispatch()

  const submitRequest = async () => {
    dispatch(requestItemFromOwner({
        itemId : params.item._id ,
        receiver : params.item.owner._id ,
        message : message 
    }))
    props.navigation.goBack()
  }

  useEffect(() => {
    props.navigation.setOptions({
        headerRight: () => {
            return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                    onPress={submitRequest}
                    title='Request'
                    disabled={message.length === 0 ? true : false}
                    buttonStyle={{
                        color : Colors.primary,
                        padding : 10,
                        backgroundColor : message.length === 0 ? 'lightgrey':'white',
                        borderRadius : 10
                    }}
                    />
                </HeaderButtons>
            )
          },
    })
  }, [message])

  return (
    <View style={styles.mainContainer}>
      <View style={styles.itemOwnerInfo}>
        <ProfileAvatarImage
          imageUrl={params.item.owner.imageUrl}
          style={styles.ownerImage}
        />
        <AssinuText style={styles.ownerName}>
          To {params.item.owner.name}
        </AssinuText>
      </View>
      <CreatePostInput
       content={message} 
       onChangeText={setMessage} 
       placeholder='Request message ...'
       />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  ownerImage: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
  },
  itemOwnerInfo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  ownerName: {
    fontFamily: "OpenSans-Bold",
    fontSize: 18,
  },
});

export default RequestItemScreen;
