import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants";

export default function DepartmentContent({ title, data }) {
  return (
    <View style={styles.container} className="bg-sky-200">
      <Text style={styles.title}>{title}: </Text>
      <View style={styles.pointsContainer}>
        <View style={styles.pointWrapper}>
          <Text style={styles.pointText}>{data}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.xLarge,
    // backgroundColor: "#FFF",
    borderRadius: SIZES.medium,
    padding: SIZES.medium,
    alignSelf: "center",
    width: "90%",
  },
  title: {
    fontSize: SIZES.large,
    color: COLORS.primary,
  },
  pointsContainer: {
    marginVertical: SIZES.small,
  },
  pointWrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginVertical: SIZES.small / 1.25,
  },
  pointDot: {
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: COLORS.gray2,
    marginTop: 6,
  },
  pointText: {
    fontSize: SIZES.medium - 2,
    color: COLORS.gray,
    marginLeft: SIZES.small,
  },
});
