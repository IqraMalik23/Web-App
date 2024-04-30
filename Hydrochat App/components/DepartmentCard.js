import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";

export default function DepartmentCard({
  name,
  url,
  name1,
  url1,
  desc,
  desc1,
}) {
  const navigation = useNavigation();
  return (
    <Animated.View
      exiting={FadeOutUp.duration(1000)}
      entering={FadeInUp.duration(1000).springify()}
      className="w-full h-48 flex flex-row justify-evenly p-3"
    >
      <TouchableOpacity
        className="border-2 border-gray-400 h-full w-[45%] justify-evenly items-center p-2 rounded-xl bg-sky-300"
        style={{
          shadowColor: "gray",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 6,
          elevation: 14,
        }}
        onPress={() =>
          navigation.push("Dep-Det", {
            dept: { name, url, desc },
          })
        }
      >
        {/* <Text className="underline text-gray-600" numberOfLines={1}>
          {name}
        </Text> */}
        {/* <Image
          source={url}
          className="w-[70] h-[70] rounded-lg"
          style={{ objectFit: "fill" }}
        /> */}
        {/* <View
          style={{
            borderBottomWidth: 2,
            borderBottomColor: "gray",
            width: "90%",
          }}
        /> */}
        <Text className="text-gray-500 text-2xl text-center" numberOfLines={3}>
          {name}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="border-2 border-gray-400 h-full w-[45%] justify-evenly items-center p-2 rounded-xl bg-sky-300"
        style={{
          shadowColor: "gray",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 6,
          elevation: 14,
        }}
        onPress={() =>
          navigation.push("Dep-Det", {
            dept: { name: name1, url: url1, desc: desc1 },
          })
        }
      >
        {/* <Text className="underline text-gray-600" numberOfLines={1}>
          {name1}
        </Text> */}
        {/* <Image source={url1} className="w-[70] h-[70] rounded-lg" /> */}
        {/* <View
          style={{
            borderBottomWidth: 2,
            borderBottomColor: "gray",
            width: "90%",
          }}
        /> */}
        <Text className="text-gray-500 text-center text-2xl">{name1}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
