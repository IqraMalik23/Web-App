import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants";

export default function DepartmentLegend({ dept }) {
  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <View
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 50 }}>{dept.name}</Text>
        </View>
      </View>
      <View style={styles.jobTitleBox}>
        <Text style={styles.jobTitle}>{dept.name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: SIZES.large,
    justifyContent: "center",
    alignItems: "center",
    height: 250,
  },
  logoBox: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    // borderRadius: SIZES.large,
    overflow: "hidden",
  },
  logoImage: {
    width: 400,
    height: 400,
    // borderRadius: 10,
    opacity: 0.2,
  },
  jobTitleBox: {
    marginTop: SIZES.small,
  },
  jobTitle: {
    fontSize: SIZES.large,
    color: COLORS.primary,
    textAlign: "center",
    textDecorationColor: "gray",
    textDecorationLine: "underline",
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
