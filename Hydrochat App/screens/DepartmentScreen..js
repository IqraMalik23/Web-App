import { View, ScrollView, Text } from "react-native";
import React from "react";
import Header from "../components/Header";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";
import { Departments } from "../constants/images";

import DepartmentCard from "../components/DepartmentCard";

export default function DepartmentScreen() {
  return (
    <View className="h-full bg-sky-100">
      <Header prevScreen="Home" />

      <ScrollView
        className="w-full h-full"
        contentContainerStyle={{ alignItems: "center" }}
      >
        <Text className="text-2xl font-bold mt-4 underline">Department</Text>
        {Departments.map((item, index) => (
          <DepartmentCard
            key={index}
            name={item.name}
            url={item.url}
            desc={item.desc}
            name1={item.name1}
            url1={item.url1}
            desc1={item.desc1}
          />
        ))}
      </ScrollView>
    </View>
  );
}
