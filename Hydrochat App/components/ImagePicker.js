import { View, Text, Animated, TouchableOpacity, Platform } from "react-native";
import React, { useEffect, useRef } from "react";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
export default function ImagePicker({ setShowPicker, setImageUrl }) {
  const transAnim = useRef(new Animated.Value(250)).current;

  const handleImage = (type) => {
    const options = {
      mediaType: "photo",
      includeBase64: false,
    };
    if (type === "camera") {
      launchCamera(options, async (response) => {
        if (response.didCancel) {
          console.log("User cancelled camera");
        } else if (response.error) {
          console.log("Camera Error: ", response.error);
        } else {
          let imageUri = response.uri || response.assets?.[0]?.uri;
          const filename = imageUri.substring(imageUri.lastIndexOf("/") + 1);
          const uploadUri =
            Platform.OS === "ios" ? imageUri.replace("file://", "") : imageUri;
          // const task = storage()
          //   .ref("project/" + filename)
          //   .putFile(uploadUri);
          // await task;
          // console.log("Upload: ", uploadUri);
          // console.log("File: ", filename);
          setImageUrl({
            filename: filename,
            uri: uploadUri,
          });
          setShowPicker(false);
        }
      });
    } else {
      launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.error) {
          console.log("Image picker error: ", response.error);
        } else {
          let imageUri = response.uri || response.assets?.[0]?.uri;
          // setSelectedImage(imageUri);
          // console.log(imageUri);
          const filename = imageUri.substring(imageUri.lastIndexOf("/") + 1);
          const uploadUri =
            Platform.OS === "ios" ? imageUri.replace("file://", "") : imageUri;
          setImageUrl({
            filename: filename,
            uri: uploadUri,
          });
          setShowPicker(false);
        }
      });
    }
  };

  const closeScreen = () => {
    Animated.timing(transAnim, {
      toValue: 250,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setShowPicker(false);
    });
  };

  useEffect(() => {
    Animated.timing(transAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      className="w-full h-full bg-transparent absolute z-10 items-center justify-end rounded-lg"
      style={{ transform: [{ translateY: transAnim }] }}
    >
      <View
        className="h-[30%] w-[80%] bg-sky-200 rounded-lg items-center p-5 border-2 border-gray-500"
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
      >
        <View className="flex flex-row items-center justify-between gap-5">
          <View className="bg-sky-500 rounded-lg border-gray-500 h-8 w-8 items-center justify-center">
            <MaterialIcons
              name="close"
              size={25}
              color={"skyblue"}
              onPress={closeScreen}
            />
          </View>
          <Text className="font-bold text-xl text-gray-500">
            Choose your option
          </Text>
        </View>
        <View className="border-b-2 border-gray-500 w-[90%] mt-2" />
        <View className="w-full h-full flex flex-row p-3 justify-between">
          <TouchableOpacity
            className="w-[45%] h-[80%] bg-sky-500 rounded-2xl items-center justify-center border-2 border-gray-500"
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
            onPress={() => handleImage("camera")}
          >
            <FontAwesome6 name="camera" size={40} color={"skyblue"} />
            <View className="border-b-2 w-[90%] mt-2 mb-2 border-sky-200" />
            <Text className="text-base text-sky-200">Take a pic</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-[45%] h-[80%] border-2 items-center justify-center bg-sky-500 rounded-2xl border-gray-500"
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
            onPress={() => handleImage()}
          >
            <MaterialIcons name="insert-photo" size={50} color={"skyblue"} />
            <View className="w-[90%] border-b-2 border-sky-200 mt-2 mb-2" />
            <Text className="text-base text-sky-200">Choose from Gallery</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}
