import { View, Text } from "react-native";
import React, { useState } from "react";
import Header from "../components/Header";
import DepartmentTabs from "../components/DepartmentTabs";
import DetailLegend from "../components/DetailLegend";
import DepartmentContent from "../components/DepartmentContent";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";

const allTabs = ["Description", "Address", "Stats"];

export default function DetailScreen({ route }) {
  const [activeTab, setActiveTab] = useState(allTabs[0]);
  const issueDetail = route.params.data;
  const name = route.params.name;
  // console.log(issueDetail);

  const displayTabContent = () => {
    switch (activeTab) {
      case "Description":
        return (
          <DepartmentContent
            title="Description"
            data={issueDetail.query_detail}
          />
        );
      case "Address":
        return <DepartmentContent title="Address" data={issueDetail.address} />;
      case "Stats":
        return (
          <DepartmentContent
            title="Stats"
            data={`Department: ${issueDetail.department}
Status: ${issueDetail.status.toUpperCase()}`}
          />
        );
      default:
        break;
    }
  };

  return (
    <Animated.View
      entering={FadeInDown.duration(1000).springify()}
      exiting={FadeOutUp.duration(1000)}
      className="bg-sky-100"
    >
      <StatusBar style="dark" />
      <Header prevScreen={name === "Posting" ? "Posts" : "Nearby"} />
      <View className="bg-sky-100 mt-2 h-full">
        <DetailLegend data={issueDetail} />
        <DepartmentTabs
          tabs={allTabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        {displayTabContent()}
      </View>
    </Animated.View>
  );
}
