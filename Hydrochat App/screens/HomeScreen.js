import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Header from "../components/Header";
import {
  FontAwesome6,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { BarChart, StackedBarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import Animated, {
  FadeInRight,
  FadeInUp,
  FadeOutDown,
  FadeOutLeft,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();
  const data = {
    labels: ["Reported", "Solved", "Pending"],
    datasets: [
      {
        data: [100, 40, 60],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#Ffffff",
    backgroundGradientTo: "#ffffff",
    barPercentage: 1.3,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(1, 122, 205, 1)`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, 1)`,

    style: {
      borderRadius: 16,
      fontFamily: "Bogle-Regular",
    },
    propsForBackgroundLines: {
      strokeWidth: 1,
      stroke: "#efefef",
      strokeDasharray: "0",
    },
    propsForLabels: {
      fontFamily: "Bogle-Regular",
    },
  };
  // const data = {
  //   labels: ["Jan", "Feb", "Mar"],
  //   legend: ["Solved", "Pending"],
  //   data: [
  //     [80, 20],
  //     [60, 20],
  //     [100, 30],
  //   ],
  //   barColors: ["#c7fafc", "#a2f8fc"],
  // };
  return (
    <View>
      <Header type="home" />
      <View className="w-full bg-sky-100 h-full items-center">
        <Animated.View
          entering={FadeInUp.duration(1000).springify()}
          exiting={FadeOutDown.duration(1000)}
          className="w-[90%] h-[40%]"
        >
          <TouchableOpacity
            className="mt-2 h-full border-2 border-gray-400 rounded-xl w-full items-center p-5 bg-white"
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
            onPress={() => navigation.push("Dashboard")}
          >
            <Text className="text-lg underline text-gray-500">Dashboard</Text>
            <BarChart
              style={{
                paddingRight: 30,
                marginBottom: 30,
                marginTop: 20,
              }}
              fromZero
              showBarTops={false}
              showValuesOnTopOfBars={true}
              withInnerLines={true}
              segments={2}
              data={data}
              width={Dimensions.get("window").width - 100}
              height={220}
              yAxisLabel=""
              chartConfig={chartConfig}
            />
            <View
              style={{
                borderBottomWidth: 2,
                borderBottomColor: "gray",
                width: "95%",
              }}
            />
            <Text className="text-gray-500 text-center">
              Check the dashboard of the issues posted and solved in other areas
            </Text>
          </TouchableOpacity>
        </Animated.View>
        <View className="h-[35%] w-full items-center mt-4 justify-between">
          <View className="h-[50%] w-[85%] flex flex-row items-center justify-between">
            <Animated.View
              entering={FadeInRight.duration(1000).springify()}
              exiting={FadeOutLeft.duration(1000)}
              className="w-[45%]"
            >
              <TouchableOpacity
                className="w-full h-full border-2 bg-white justify-between items-center rounded-lg p-2  border-gray-400"
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
                onPress={() => navigation.push("Posts")}
              >
                <Text
                  style={{
                    color: "gray",
                    textDecorationLine: "underline",
                    textDecorationColor: "gray",
                    fontSize: 20,
                  }}
                >
                  Posting
                </Text>
                <FontAwesome6
                  name="house-flood-water"
                  size={30}
                  color="#05e9ed"
                  style={{ marginTop: 25 }}
                />
                <View
                  style={{
                    width: "95%",
                    borderBottomWidth: 1,
                    borderBottomColor: "gray",
                    borderStyle: "solid",
                    marginTop: 25,
                  }}
                />
                <Text style={{ color: "gray", textAlign: "center" }}>
                  Posted issues by the people
                </Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View
              entering={FadeInRight.delay(200).duration(1000).springify()}
              exiting={FadeOutLeft.duration(1000)}
              className="w-[45%]"
            >
              <TouchableOpacity
                className="w-full h-full border-2 shadow-2xl bg-white justify-between items-center rounded-lg p-2  border-gray-400"
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
                onPress={() => navigation.push("Report")}
              >
                <Text
                  style={{
                    color: "gray",
                    textDecorationLine: "underline",
                    textDecorationColor: "gray",
                    fontSize: 20,
                  }}
                >
                  Report
                </Text>
                <MaterialIcons
                  name="report"
                  size={40}
                  color={"#05e9ed"}
                  style={{ marginTop: 15 }}
                />
                <View
                  style={{
                    width: "95%",
                    borderBottomWidth: 1,
                    borderBottomColor: "gray",
                    borderStyle: "solid",
                    marginTop: 25,
                  }}
                />
                <Text style={{ color: "gray" }}>Upload issues here</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
          <View className="mt-3 h-[50%] w-[85%] flex flex-row items-center justify-between">
            <Animated.View
              entering={FadeInRight.delay(400).duration(1000).springify()}
              exiting={FadeOutLeft.duration(1000)}
              className="w-[45%]"
            >
              <TouchableOpacity
                className="w-full h-full border-2 shadow-2xl  border-gray-400 bg-white justify-between items-center rounded-lg p-2"
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
                onPress={() => navigation.push("Department")}
              >
                <Text
                  style={{
                    color: "gray",
                    textDecorationLine: "underline",
                    textDecorationColor: "gray",
                    fontSize: 20,
                  }}
                >
                  Department
                </Text>
                <MaterialCommunityIcons
                  name="office-building-marker"
                  size={40}
                  color="#05e9ed"
                  style={{ marginTop: 25 }}
                />
                <View
                  style={{
                    width: "95%",
                    borderBottomWidth: 1,
                    borderBottomColor: "gray",
                    borderStyle: "solid",
                    marginTop: 15,
                  }}
                />
                <Text style={{ color: "gray", textAlign: "center" }}>
                  Available Departments
                </Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View
              entering={FadeInRight.delay(500).duration(1000).springify()}
              exiting={FadeOutLeft.duration(1000)}
              className="w-[45%]"
            >
              <TouchableOpacity
                className="w-full h-full border-2 border-gray-400 shadow-2xl bg-white justify-between items-center rounded-lg p-2"
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
                onPress={() => navigation.push("Nearby")}
              >
                <Text
                  style={{
                    color: "gray",
                    textDecorationLine: "underline",
                    textDecorationColor: "gray",
                    fontSize: 20,
                  }}
                >
                  Nearby
                </Text>
                <MaterialIcons
                  name="nearby-error"
                  size={40}
                  color="#05e9ed"
                  style={{ marginTop: 25 }}
                />
                <View
                  style={{
                    width: "95%",
                    borderBottomWidth: 1,
                    borderBottomColor: "gray",
                    borderStyle: "solid",
                    marginTop: 15,
                  }}
                />
                <Text style={{ color: "gray", textAlign: "center" }}>
                  Nearby issues reported
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </View>
    </View>
  );
}
