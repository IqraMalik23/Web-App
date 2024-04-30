import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { COLORS, SIZES, SHADOWS } from "../constants";

const TabButton = ({ name, activeTab, onHandleSearchType }) => (
  <TouchableOpacity
    style={styles.btn}
    className={`${name === activeTab ? "bg-sky-600" : "bg-sky-300"}`}
    onPress={onHandleSearchType}
  >
    <Text style={styles.btnText(name, activeTab)}>{name}</Text>
  </TouchableOpacity>
);

export default function DepartmentTabs({ tabs, activeTab, setActiveTab }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={tabs}
        renderItem={({ item }) => (
          <TabButton
            name={item}
            activeTab={activeTab}
            onHandleSearchType={() => setActiveTab(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        contentContainerStyle={{ columnGap: SIZES.small / 2 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.xxLarge,
    marginBottom: SIZES.small / 2,
    alignItems: "center",
  },
  btn: {
    paddingVertical: SIZES.medium,
    paddingHorizontal: SIZES.xLarge,
    borderRadius: SIZES.medium,
    marginLeft: 2,
    borderColor: "gray",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  },
  btnText: (name, activeTab) => ({
    fontSize: SIZES.small,
    color: name === activeTab ? "#ffffff" : "#000000",
  }),
});
