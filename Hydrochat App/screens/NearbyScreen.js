import { View, Text, ScrollView, Platform, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import PostCard from "../components/PostCard";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";
import GetLocation from "react-native-get-location";
import Loading from "../components/Loading";
import {
  isLocationEnabled,
  promptForEnableLocationIfNeeded,
} from "react-native-android-location-enabler";
import { db } from "../firebase_config/config";
import { onValue, ref } from "firebase/database";

const NearbyScreen = ({ navigation }) => {
  const [locationCheck, setLocationCheck] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [allowRefresh, setAllowRefresh] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    navigation.push("Nearby");
    setRefreshing(false);
  }, []);

  useEffect(() => {
    const locationChecker = async () => {
      if (Platform.OS === "android") {
        const checkEnabled = await isLocationEnabled();
        return checkEnabled;
      }
    };

    const getLocation = async () => {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
      })
        .then((location) => {
          console.log(location);
        })
        .catch(() => {});
    };
    const locationON = async () => {
      if (Platform.OS === "android") {
        promptForEnableLocationIfNeeded()
          .then(() => {
            setLocationCheck(false);
            setAllowRefresh(false);
          })
          .catch((error) => {
            setLocationCheck(true);
            setAllowRefresh(true);
          });
      }
    };
    locationON();
    const postCountRef = ref(db, "reports/");
    let allData = [];
    onValue(postCountRef, (snapshot) => {
      const data = snapshot.val();

      Object.keys(data).map((key) => {
        if (data[key].state === "Maharashtra") {
          allData.push({ ...data[key] });
        }
      });
      setData(allData);
    });
  }, []);

  return (
    <Animated.View
      entering={FadeInDown.duration(1000).springify()}
      exiting={FadeOutUp.duration(1000)}
      className="h-full bg-sky-100"
    >
      {loading && <Loading />}
      <Header type="no" prevScreen="Home" />

      <ScrollView
        refreshControl={
          allowRefresh && (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          )
        }
        className="w-full h-full bg-sky-100 mb-4"
        contentContainerStyle={{
          alignItems: "center",
          gap: 12,
        }}
      >
        <Text className="text-2xl font-bold mt-4 underline">Nearby</Text>
        {locationCheck ? (
          <View className="w-[90%] h-64 items-center justify-center">
            <Text className="text-lg text-gray-500 underline">
              You have not enabled the location please pull down the page to
              refresh and click OK.
            </Text>
          </View>
        ) : (
          data.map((item, index) => (
            <PostCard key={index} data={item} name={"Nearby"} />
          ))
        )}
      </ScrollView>
    </Animated.View>
  );
};

export default NearbyScreen;
