import axios from "axios";
import React, { useState } from "react";
import { View, StyleSheet, Text, Keyboard } from "react-native";

import { SearchBar } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import CustomActivityIndicator from "../../components/UI/CustomActivityIndicator";
import HOST, { SERVER_PORT } from "../../configs/config";
import { Ionicons } from "@expo/vector-icons";
import MemberItem from "../../components/UI/MemberItem";
import NotFound from "../../components/UI/NotFound";
import {no_result} from '../../constants/compiledImages'


export const UserSearchScreen = (props) => {
  const { token, userId } = useSelector((state) => state.auth);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showNoResults, setShowNoResults] = useState(false)


  const searchForUser = async () => {
    Keyboard.dismiss()
    setIsSearching(true);
    try {
      const response = await axios.get(
        `http://${HOST}:${SERVER_PORT}/user/search?username=${searchInput}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setIsSearching(false);
        setSearchResults(response.data.searchResults);
        if (response.data.searchResults.length === 0) {
          setShowNoResults(true)
        }
      }
    } catch (err) {
      setIsSearching(false);
      console.log(err);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <SearchBar
      onFocus={() => setShowNoResults(false)}
        clearIcon={
          <Ionicons
            onPress={searchForUser}
            name="search-outline"
            size={24}
            color="white"
          />
        }
        placeholder="search for users.."
        onChangeText={(value) => {
          setSearchInput(value);
        }}
        value={searchInput}
      />
      {isSearching ? (
        <CustomActivityIndicator />
      ) : (
       showNoResults ? 
        <NotFound
        image={no_result}
        style={{
          width: 300,
          height: 300,
        }}
      /> :
        <FlatList
          data={searchResults}
          renderItem={({ item }) => {
            console.log("item : ", item.name);
            return (
                <MemberItem
                openStudentProfile={() => {
                    if (item._id === userId) {
                        props.navigation.navigate('UserProfileNavigator')
                    }
                    else
                        props.navigation.navigate('StudentProfile', {
                            user: item
                        })
                }}
                name={item.name}
                imageUrl={item.imageUrl}
            />
            )
          }}
          keyExtractor={(item) => item._id}
        />
      )}
    </View>
  );
};
