import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS, SHADOWS, SIZES } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const PostCard = ({ data, name }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      className="bg-sky-200"
      onPress={() => navigation.navigate("Detail", { data: data, name: name })}
    >
      <TouchableOpacity
        style={styles.logoContainer}
        onPress={() =>
          navigation.navigate("Detail", { data: data, name: name })
        }
      >
        <Image src={data.url} style={styles.logImage} />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>
          {data.query_title}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="location" color={"gray"} />
            <Text className="text-[16] text-gray-400 ml-1" numberOfLines={1}>
              {data.state}
            </Text>
          </View>
          <Text style={styles.jobType}>
            Status: {data.status.toUpperCase()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: SIZES.small,
    borderRadius: SIZES.large,
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  },
  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  logImage: {
    width: "90%",
    height: "90%",
    borderRadius: SIZES.medium,
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
    gap: 5,
  },
  jobName: {
    fontSize: SIZES.medium,
    color: "#323536",
  },
  jobType: {
    fontSize: SIZES.small + 2,
    color: COLORS.gray,
    textTransform: "capitalize",
  },
});
