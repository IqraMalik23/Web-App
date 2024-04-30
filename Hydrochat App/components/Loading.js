import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

export default function Loading({ data }) {
  return (
    <View className="bg-sky-200 opacity-50 absolute h-full w-full z-10 items-center justify-center">
      <ActivityIndicator size={50} color={"#00a7ff"} />
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 15,
          color: "#00a7ff",
          marginTop: 10,
        }}
      >
        {data}
      </Text>
    </View>
  );
}
