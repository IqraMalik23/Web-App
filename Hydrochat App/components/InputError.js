import { View, Text } from "react-native";
import React from "react";

export default function InputError({ data }) {
  return (
    <View>
      <Text
        style={{
          color: "red",
          fontStyle: "italic",
          textDecorationLine: "underline",
          marginLeft: 2,
        }}
      >
        {data}
      </Text>
    </View>
  );
}
