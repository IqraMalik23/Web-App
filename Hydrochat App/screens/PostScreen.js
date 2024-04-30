import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Dropdown } from "react-native-element-dropdown";
import PostCard from "../components/PostCard";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";
import { db } from "../firebase_config/config";
import { onValue, ref } from "firebase/database";
import { AntDesign } from "@expo/vector-icons";
import { States } from "../constants/images";

export default function PostScreen() {
  const [allPosts, setAllPosts] = useState([]);
  const [state, setState] = useState("");
  const [subData, setSubData] = useState([]);

  const [value, setValue] = useState(0);

  useEffect(() => {
    const fetchNewData = () => {
      let newData = [];
      allPosts.map((item) => {
        if (item.state === state) {
          newData.push(item);
        }
      });
      setSubData(newData);
    };
    fetchNewData();
  }, [state]);

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.name}</Text>
        {item.value === value && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      </View>
    );
  };

  useEffect(() => {
    const postCountRef = ref(db, "reports/");
    onValue(postCountRef, (snapshot) => {
      const data = snapshot.val();
      const posts = Object.keys(data).map((key) => ({
        ...data[key],
      }));
      setSubData(posts);
      setAllPosts(posts);
    });
  }, []);

  return (
    <Animated.View
      entering={FadeInDown.duration(1000).springify()}
      exiting={FadeOutUp.duration(1000)}
      className="h-full bg-sky-100"
    >
      <Header type="no" prevScreen="Home" />

      <ScrollView
        className="w-full h-full bg-sky-100 mb-4"
        contentContainerStyle={{
          alignItems: "center",
          gap: 12,
        }}
      >
        <Text className="text-2xl font-bold mt-4 underline">Posting</Text>
        <Dropdown
          style={styles.dropdown}
          className="bg-sky-200"
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={States}
          maxHeight={200}
          labelField="name"
          valueField="value"
          placeholder="Select a state"
          value={value}
          onChange={(item) => {
            setState(item.name);
            setValue(item.value);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color="black"
              name="Safety"
              size={20}
            />
          )}
          renderItem={renderItem}
        />
        {subData.length > 0 ? (
          subData.map((item, index) => (
            <PostCard key={index} data={item} name={"Posting"} />
          ))
        ) : (
          <View className="h-52 items-center justify-center w-full">
            <Text className="text-gray-500 text-base underline">
              No issues reported from this state
            </Text>
          </View>
        )}
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    margin: 5,
    width: "90%",
    height: 50,
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
    color: "gray",
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    color: "gray",
  },
  placeholderStyle: {
    fontSize: 16,
    color: "gray",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "gray",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
