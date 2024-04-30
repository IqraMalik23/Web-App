import { View, Text, Dimensions, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { BarChart } from "react-native-chart-kit";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import { onValue, ref } from "firebase/database";
import { auth, db } from "../firebase_config/config";
import Loading from "../components/Loading";

const chartConfig = {
  backgroundGradientFrom: "#Ffffff",
  backgroundGradientTo: "#ffffff",
  barPercentage: 1.3,
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(1, 122, 205, 1)`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, 1)`,

  propsForBackgroundLines: {
    strokeWidth: 1,
    stroke: "#efefef",
    strokeDasharray: "0",
  },
  propsForLabels: {
    fontFamily: "Bogle-Regular",
  },
};

export default function DashboardScreen() {
  const user = auth.currentUser.email;
  const [loading, setLoading] = useState(false);
  const [dashDetails, setDashDetails] = useState({
    my_total: 0,
    total: 0,
    pending: 0,
    my_pending: 0,
    solved: 0,
    my_solved: 0,
  });

  useEffect(() => {
    setLoading(true);
    let my_total = 0;
    let total = 0;
    let pending = 0;
    let my_pending = 0;
    let my_solved = 0;
    let solved = 0;
    const postCountRef = ref(db, "reports/");
    onValue(postCountRef, (snapshot) => {
      const data = snapshot.val();
      Object.keys(data).map((key) => {
        // console.log(data[key]);
        total += 1;
        if (data[key].posted_by === user) {
          my_total += 1;
          if (data[key].status === "pending") {
            my_pending += 1;
          } else {
            my_solved += 1;
          }
        }
        if (data[key].status === "pending") {
          pending += 1;
        } else {
          solved += 1;
        }
      });
      setDashDetails({
        my_total: my_total,
        total: total,
        pending: pending,
        my_pending: my_pending,
        solved: solved,
        my_solved: my_solved,
      });
    });
    setLoading(false);
  }, []);

  const data = {
    labels: ["Reported", "Solved", "Pending"],
    datasets: [
      {
        data: [
          dashDetails.my_total,
          dashDetails.my_solved,
          dashDetails.my_pending,
        ],
      },
    ],
  };

  return (
    <View className="items-center bg-sky-100">
      {loading && <Loading data={"Please Wait ..."} />}
      <StatusBar style="dark" />
      <Header prevScreen="Home" />
      <View className="h-full mt-2 bg-sky-100 items-center">
        <Animated.View
          entering={FadeInDown.duration(1000).springify()}
          exiting={FadeOutUp.duration(1000)}
          className="h-[20%] w-full p-2 flex flex-row justify-evenly"
        >
          <View
            className="border-2 h-full w-[45%] rounded-lg border-gray-300 bg-sky-300 items-center justify-evenly"
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
          >
            <MaterialCommunityIcons
              name="sticker-check"
              size={50}
              color={"gray"}
            />
            <Text className="text-gray-500 text-base">Issues Solved:</Text>
            <Text className="text-3xl">{dashDetails.solved}</Text>
          </View>
          <View
            className="border-2 h-full w-[45%] rounded-lg border-gray-300 bg-sky-300 items-center justify-evenly"
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
          >
            <MaterialIcons name="pending-actions" size={50} color={"gray"} />
            <Text className="text-gray-500 text-base">Issues Pending:</Text>
            <Text className="text-3xl">{dashDetails.pending}</Text>
          </View>
        </Animated.View>
        <Animated.View
          entering={FadeInDown.delay(200).duration(1000).springify()}
          exiting={FadeOutUp.duration(1000)}
          className="border-2 p-3 rounded-lg border-gray-300 bg-white"
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
        >
          <BarChart
            style={{ borderRadius: 20, borderColor: "gray", marginTop: 5 }}
            fromZero
            showBarTops={false}
            showValuesOnTopOfBars={true}
            segments={3}
            data={data}
            width={Dimensions.get("window").width - 20}
            height={300}
            yAxisLabel=""
            chartConfig={chartConfig}
          />
        </Animated.View>
        <Animated.View
          entering={FadeInDown.delay(400).duration(1000).springify()}
          exiting={FadeOutUp.duration(1000)}
          className="h-[20%] w-full p-2 flex flex-row justify-evenly"
        >
          <View
            className="border-2 h-full w-[45%] rounded-lg border-gray-300 bg-sky-300 items-center justify-evenly"
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
          >
            <MaterialCommunityIcons
              name="water-alert"
              size={50}
              color={"gray"}
            />
            <Text className="text-gray-500 text-base">Total Issues:</Text>
            <Text className="text-3xl">{dashDetails.total}</Text>
          </View>
          <View
            className="border-2 h-full w-[45%] rounded-lg border-gray-300 bg-sky-300 items-center justify-evenly"
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
          >
            <MaterialIcons name="report" size={50} color={"gray"} />
            <Text className="text-gray-500 text-base">Issues Reported:</Text>
            <Text className="text-3xl">{dashDetails.my_total}</Text>
          </View>
        </Animated.View>
      </View>
    </View>
  );
}
