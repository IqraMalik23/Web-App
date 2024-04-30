import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Header from "../components/Header";
import { Dropdown, SelectCountry } from "react-native-element-dropdown";
import { MaterialIcons } from "@expo/vector-icons";
import Animated, { FadeInUp, FadeOutDown } from "react-native-reanimated";
import { auth } from "../firebase_config/config";

import storage from "@react-native-firebase/storage";
import ImagePicker from "../components/ImagePicker";
import { Cities, DeptList, States } from "../constants/images";
import Loading from "../components/Loading";
import { db } from "../firebase_config/config";
import { set, ref } from "firebase/database";
import InputError from "../components/InputError";
import { useNavigation } from "@react-navigation/native";

const date = new Date();
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function ReportScreen() {
  const [city, setCity] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [department, setDepartment] = useState(null);
  const [cityName, setCityName] = useState(null);
  const [cityList, setCityList] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const navigate = useNavigation();
  const [test, setTest] = useState([]);
  const [imageUrl, setImageUrl] = useState({
    filename: "",
    uri: "",
  });
  const user = auth.currentUser.email;
  const [reportDetails, setReportDetails] = useState({
    user_name: "",
    query_name: "",
    query_det: "",
    address: "",
    city_name: "",
    city: "",
    dept_name: "",
  });
  const [errors, setErrors] = useState({
    user_name: false,
    query_name: false,
    query_det: false,
    address: false,
    city_name: false,
    dept_name: false,
    city: false,
    url: false,
  });
  const [loading, setLoading] = useState(false);

  const handleImagePicker = () => {
    setShowPicker(true);
  };

  const handleSubmit = async () => {
    setLoading(true);
    let trigger = false;
    if (reportDetails.user_name.length < 4) {
      trigger = true;
      setErrors((prev) => ({ ...prev, user_name: true }));
    } else {
      setErrors((prev) => ({ ...prev, user_name: false }));
    }
    if (reportDetails.query_name.length < 5) {
      trigger = true;
      setErrors((prev) => ({ ...prev, query_name: true }));
    } else {
      setErrors((prev) => ({ ...prev, query_name: false }));
    }
    if (reportDetails.query_det.length < 20) {
      trigger = true;
      setErrors((prev) => ({ ...prev, query_det: true }));
    } else {
      setErrors((prev) => ({ ...prev, query_det: false }));
    }
    if (reportDetails.city.length < 1) {
      trigger = true;
      setErrors((prev) => ({ ...prev, city: true }));
    } else {
      setErrors((prev) => ({ ...prev, city: false }));
    }
    if (reportDetails.city_name.length < 1) {
      trigger = true;
      setErrors((prev) => ({ ...prev, city_name: true }));
    } else {
      setErrors((prev) => ({ ...prev, city_name: false }));
    }
    if (reportDetails.dept_name.length < 1) {
      trigger = true;
      setErrors((prev) => ({ ...prev, dept_name: true }));
    } else {
      setErrors((prev) => ({ ...prev, dept_name: false }));
    }
    if (imageUrl.filename < 1) {
      trigger = true;
      setErrors((prev) => ({ ...prev, url: true }));
    } else {
      setErrors((prev) => ({ ...prev, url: false }));
    }
    if (reportDetails.address.length < 15) {
      trigger = true;
      setErrors((prev) => ({ ...prev, address: true }));
    } else {
      setErrors((prev) => ({ ...prev, address: false }));
    }
    if (trigger === true) {
      setLoading(false);
      return;
    } else {
      const task = storage()
        .ref(`project/${user}/${imageUrl.filename}`)
        .putFile(imageUrl.uri);
      await task;
      const url = await storage()
        .ref(`project/${user}/${imageUrl.filename}`)
        .getDownloadURL();
      set(ref(db, `reports/${reportDetails.query_name}`), {
        user_name: reportDetails.user_name,
        posted_by: user,
        query_title: reportDetails.query_name,
        query_detail: reportDetails.query_det,
        state: reportDetails.city_name,
        city: reportDetails.city,
        department: reportDetails.dept_name,
        url: url,
        address: reportDetails.address,
        date:
          monthNames[date.getMonth()].slice(0, 3) + " " + date.getFullYear(),
        status: "pending",
      });
      setImageUrl({
        filename: "",
        uri: "",
      });
      setReportDetails({
        user_name: "",
        query_name: "",
        query_det: "",
        address: "",
        city_name: "",
        dept_name: "",
      });
      setLoading(false);
      navigate.push("Home");
    }
  };

  return (
    <View className="bg-sky-100 h-full">
      {loading && <Loading data={"Uploading..."} />}
      <Header prevScreen="Home" />
      {showPicker && (
        <ImagePicker setShowPicker={setShowPicker} setImageUrl={setImageUrl} />
      )}
      <Animated.ScrollView
        entering={FadeInUp.duration(1000).springify()}
        exiting={FadeOutDown.duration(1000)}
        className="bg-sky-100 h-full flex mt-3"
        contentContainerStyle={{ alignItems: "center" }}
      >
        <Text className="font-bold text-xl">Report Issue</Text>
        <TextInput
          placeholder="Enter your username"
          className="bg-sky-300 w-[90%] h-14 text-gray-500 rounded-xl p-3 mt-3 placeholder:text-base"
          style={{
            shadowColor: "#0aaafc",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 6,
            elevation: 14,
          }}
          onChangeText={(name) =>
            setReportDetails((prev) => ({ ...prev, user_name: name }))
          }
          autoCapitalize="none"
        />
        {errors.user_name && (
          <View className="w-[90%]">
            <InputError data={"Username should contain atleast 4 characters"} />
          </View>
        )}

        <TextInput
          placeholder="Enter the name of your query!"
          className="bg-sky-300 w-[90%] text-gray-500 h-14 rounded-xl p-3 mt-3 placeholder:text-base"
          style={{
            shadowColor: "#0aaafc",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 6,
            elevation: 14,
          }}
          onChangeText={(q_name) =>
            setReportDetails((prev) => ({ ...prev, query_name: q_name }))
          }
          autoCapitalize="none"
        />
        {errors.query_name && (
          <View className="w-[90%]">
            <InputError
              data={"Query name field should contain atleast 5 characters"}
            />
          </View>
        )}
        <TextInput
          placeholder="Enter your query!"
          multiline
          numberOfLines={6}
          className="bg-sky-300 w-[90%] h-40 rounded-xl text-gray-500 p-3 mt-3 placeholder:text-base"
          style={{
            textAlignVertical: "top",
            shadowColor: "#0aaafc",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 6,
            elevation: 14,
          }}
          onChangeText={(q_det) =>
            setReportDetails((prev) => ({ ...prev, query_det: q_det }))
          }
          autoCapitalize="none"
        />
        {errors.query_det && (
          <View className="w-[90%]">
            <InputError
              data={"Your query should conatin atleast 20 characters"}
            />
          </View>
        )}
        <Dropdown
          style={{
            width: "90%",
            shadowColor: "#0aaafc",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 6,
            elevation: 14,
          }}
          placeholderStyle={{ color: "gray" }}
          className="bg-sky-300 h-12 rounded-lg p-3 mt-3"
          data={States}
          search
          itemTextStyle={{ color: "gray" }}
          selectedTextStyle={{ color: "gray" }}
          maxHeight={300}
          labelField="name"
          valueField="value"
          placeholder={!isFocus ? "Select state" : "..."}
          searchPlaceholder="Search..."
          value={city}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setCity(item.value);
            setCityList(Cities[item.name]);
            setCityName(null);
            setReportDetails((prev) => ({ ...prev, city_name: item.name }));
            setIsFocus(false);
          }}
        />
        {errors.city_name && (
          <View className="w-[90%]">
            <InputError data={"Select a state"} />
          </View>
        )}

        <Dropdown
          style={{
            width: "90%",
            shadowColor: "#0aaafc",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 6,
            elevation: 14,
          }}
          placeholderStyle={{ color: "gray" }}
          className="bg-sky-300 h-12 rounded-lg p-3 mt-3"
          data={cityList}
          search
          itemTextStyle={{ color: "gray" }}
          selectedTextStyle={{ color: "gray" }}
          maxHeight={300}
          labelField="name"
          valueField="value"
          placeholder={!isFocus ? "Select city" : "..."}
          searchPlaceholder="Search..."
          value={cityName}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setCityName(item.value);
            setReportDetails((prev) => ({ ...prev, city: item.name }));
            setIsFocus(false);
          }}
        />
        {errors.city && (
          <View className="w-[90%]">
            <InputError data={"Select a city"} />
          </View>
        )}
        <Dropdown
          style={{
            width: "90%",
            shadowColor: "#0aaafc",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 6,
            elevation: 14,
          }}
          placeholderStyle={{ color: "gray" }}
          className="bg-sky-300 h-12 rounded-lg p-3 mt-3"
          data={DeptList}
          search
          itemTextStyle={{ color: "gray" }}
          selectedTextStyle={{ color: "gray" }}
          maxHeight={300}
          labelField="name"
          valueField="value"
          placeholder={!isFocus ? "Select ward related to the pin code" : "..."}
          searchPlaceholder="Search..."
          value={department}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setDepartment(item.value);
            setReportDetails((prev) => ({ ...prev, dept_name: item.name }));
            setIsFocus(false);
          }}
        />
        {errors.dept_name && (
          <View className="w-[90%]">
            <InputError data={"Select a department"} />
          </View>
        )}

        <TouchableOpacity
          className="bg-sky-300 w-[90%] h-14 mt-3 rounded-lg items-center p-2 flex flex-row"
          style={{
            shadowColor: "#0aaafc",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 6,
            elevation: 14,
          }}
          onPress={handleImagePicker}
        >
          <MaterialIcons name="upload-file" size={25} color={"gray"} />
          <Text
            className="text-gray-500 text-base w-[85%] ml-2"
            numberOfLines={1}
          >
            {imageUrl.filename.length === 0
              ? "Upload an image"
              : imageUrl.filename}
          </Text>
        </TouchableOpacity>
        {errors.url && (
          <View className="w-[90%]">
            <InputError data={"Select the image of the issue here"} />
          </View>
        )}
        <TextInput
          placeholder="Enter the address"
          multiline
          numberOfLines={3}
          className="bg-sky-300 w-[90%] h-24 text-gray-500 rounded-xl p-3 mt-3 placeholder:text-base"
          style={{
            textAlignVertical: "top",
            shadowColor: "#0aaafc",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 6,
            elevation: 14,
          }}
          onChangeText={(add) =>
            setReportDetails((prev) => ({ ...prev, address: add }))
          }
          autoCapitalize="none"
        />
        {errors.address && (
          <View className="w-[90%]">
            <InputError data={"Address should contain atleast 15 characters"} />
          </View>
        )}
        <TouchableOpacity
          className="items-center justify-center w-[90%] mt-4 h-16 mb-3 bg-sky-700 rounded-xl"
          style={{
            textAlignVertical: "top",
            shadowColor: "#0aaafc",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 6,
            elevation: 14,
          }}
          onPress={handleSubmit}
        >
          <Text className="font-bold text-lg text-white">Submit</Text>
        </TouchableOpacity>
      </Animated.ScrollView>
    </View>
  );
}
