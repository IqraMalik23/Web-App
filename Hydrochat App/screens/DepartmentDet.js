import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import DepartmentLegend from "../components/DepartmentLegend";
import DepartmentContent from "../components/DepartmentContent";
import DepartmentTabs from "../components/DepartmentTabs";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";
import { onValue, ref } from "firebase/database";
import { db } from "../firebase_config/config";

const allTabs = ["Description", "Stats"];

export default function DepartmentDet({ route, navigation }) {
  const [activeTab, setActiveTab] = useState(allTabs[0]);
  const dept = route.params.dept;
  const [stats, setStats] = useState({
    reported: 0,
    solved: 0,
  });

  useEffect(() => {
    const postCountRef = ref(db, "reports/");
    let reported = 0;
    let solved = 0;
    onValue(postCountRef, (snapshot) => {
      const data = snapshot.val();
      Object.keys(data).map((key) => {
        if (data[key].department === dept.name) {
          reported += 1;
          if (data[key].status !== "pending") {
            solved += 1;
          }
        }
      });
      setStats({
        reported: reported,
        solved: solved,
      });
    });
  }, []);

  const displayTabContent = () => {
    switch (activeTab) {
      case "Description":
        return <DepartmentContent title="Description" data={dept.desc} />;
      case "Stats":
        return (
          <DepartmentContent
            title="Statistics"
            data={`Reported: ${stats.reported}
Solved: ${stats.solved}`}
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
      <Header prevScreen="Department" />
      <View className="bg-sky-100 mt-4 h-full">
        <DepartmentLegend dept={dept} />
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
