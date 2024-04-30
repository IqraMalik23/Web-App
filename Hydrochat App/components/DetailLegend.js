import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants";
import { Ionicons } from "@expo/vector-icons";

export default function DetailLegend({ data }) {
  return (
    <View style={styles.container}>
      <View style={styles.logoBox} className="bg-sky-100">
        <Image src={data.url} style={styles.logoImage} />
      </View>
      <View style={styles.jobTitleBox}>
        <Text style={styles.jobTitle}>{data.query_title}</Text>
        <View className="flex flex-row items-center justify-center">
          <Ionicons name="location" color={"gray"} />
          <Text className="text-gray-500 ml-1">{data.state}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: SIZES.xxLarge,
    justifyContent: "center",
    alignItems: "center",
    height: 250,
  },
  logoBox: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "skyblue",
    // borderRadius: SIZES.large,
    overflow: "hidden",
  },
  logoImage: {
    width: 400,
    height: 400,
    borderRadius: 10,
    objectFit: "contain",
    // opacity: 0.2,
  },
  jobTitleBox: {
    marginTop: SIZES.small,
  },
  jobTitle: {
    fontSize: SIZES.large,
    color: COLORS.primary,
    textAlign: "center",
    textDecorationLine: "underline",
    textDecorationColor: "gray",
  },
  companyInfoBox: {
    marginTop: SIZES.small / 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  companyName: {
    fontSize: SIZES.medium - 2,
    color: COLORS.primary,
  },
  locationBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  locationImage: {
    width: 14,
    height: 14,
    tintColor: COLORS.gray,
  },
  locationName: {
    fontSize: SIZES.medium - 2,
    color: COLORS.gray,
    marginLeft: 2,
  },
});
