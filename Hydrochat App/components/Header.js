import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Header({ type, prevScreen }) {
  const navigation = useNavigation();
  const handleBack = () => {
    navigation.push(prevScreen);
  };
  return (
    <View className="h-20 w-full flex flex-row items-end justify-between px-5 bg-sky-100 mt-2">
      <View className="flex flex-row items-end gap-2">
        {type !== "home" && (
          <TouchableOpacity
            className="bg-sky-100 w-[40] h-[40] rounded-lg justify-end items-center"
            onPress={handleBack}
          >
            <Ionicons name="arrow-back" size={28} />
          </TouchableOpacity>
        )}
        <Text className="font-bold text-lg pb-1">Welcome to HydroChat</Text>
      </View>
      <View className="w-[45] h-[45] bg-sky-100 rounded-md justify-center items-center">
        <Image
          source={require("../assets/images/droplet.jpg")}
          className="w-full h-full rounded-md"
        />
      </View>
    </View>
  );
}
