import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  FlatList,
  Keyboard,
} from "react-native";
import SearchInput from "../../components/sharingCenterComponents/SearchInput";
import SharedItem from "../../components/sharingCenterComponents/SharedItem";
import CustomActivityIndicator from "../../components/UI/CustomActivityIndicator";
import axios from "axios";
import HOST, { SERVER_PORT } from "../../configs/config";
import { useSelector } from "react-redux";
import NotFound from "../../components/UI/NotFound";
import { no_shared_items } from "../../constants/compiledImages";
const SharingCenterDepartment = (props) => {
  const [items, setItems] = useState([]);

  const [searchInput, setSearchInput] = useState("");

  const [isSearching, setIsSearching] = useState(false);

  const { departmentId, token } = useSelector((state) => state.auth);

  const searchForItems = async (value: string) => {
    setIsSearching(true);
    setSearchInput(value);

    if (value.length === 0) {
      console.log("yes it is zero");
      fetchItems(false);
    }

    try {
      setIsSearching(true);
      const response = await axios.get(
        `http://${HOST}:${SERVER_PORT}/sharingcenter/department/search?name=${value}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.status === 200) {
        setItems(response.data.items);
      }

      setIsSearching(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchItems = async (isCancelled: boolean) => {
    try {
      const response = await axios.get(
        `http://${HOST}:${SERVER_PORT}/sharingcenter/department/${departmentId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.status === 200) {
        if (!isCancelled) {
          setItems(response.data.items);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let isCancelled: boolean = false;
    console.log("are you sure about this thing man yes?");
    fetchItems(isCancelled);

    return () => {
      isCancelled = true;
    };
  }, [props.route.params]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <SearchInput value={searchInput} searchForItems={searchForItems} />
        {searchInput.length !== 0 && isSearching ? (
          <CustomActivityIndicator />
        ) : (
          <FlatList
            contentContainerStyle={{
              paddingBottom: 15,
              backgroundColor: "white",
            }}
            numColumns={2}
            data={items}
            ListEmptyComponent={() => {
              return (
                <NotFound
                  title="No new Items"
                  titleStyle={{
                    fontFamily: "OpenSans-Bold",
                    fontSize: 18,
                  }}
                  image={no_shared_items}
                  style={{
                    width: 200,
                    height: 200,
                  }}
                />
              );
            }}
            renderItem={(itemData) => {
              return (
                <SharedItem
                  imageUrl={itemData.item.imageUrl}
                  itemName={itemData.item.name}
                  openDetails={() =>
                    props.navigation.navigate("ItemDetailsScreen", {
                      item: itemData.item,
                    })
                  }
                />
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({});

export default SharingCenterDepartment;
