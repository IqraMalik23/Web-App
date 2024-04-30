import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import InputError from "../components/InputError";
import { EvilIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import Wave from "../assets/images/wave3.png";
import { auth } from "../firebase_config/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import Loading from "../components/Loading";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setErrors(false);
      setEmail("");
      setPassword("");
      setLoading(false);
      navigation.push("Home");
    } catch (error) {
      console.log(error);
      setErrors(true);
      setLoading(false);
    }
  };

  return (
    <View>
      {loading && <Loading data="Please Wait..." />}
      <ScrollView className="bg-white h-full w-full">
        <StatusBar style="dark" />
        <Image
          source={Wave}
          style={{ height: 300, width: "100%" }}
          className="absolute top-0"
        />
        <View className="p-5 mt-32">
          <Animated.View
            entering={FadeInUp.duration(1000).springify()}
            className="flex flex-row items-center"
          >
            <Text className="font-bold text-2xl">Welcome Back!</Text>
            <MaterialCommunityIcons
              name="hand-clap"
              size={25}
              color={"gold"}
              style={{ marginLeft: 5 }}
            />
          </Animated.View>
          <Animated.Text
            entering={FadeInUp.duration(1000)}
            className="text-gray-400 text-base"
          >
            Sign in to your account and stay updated with the latest information
            on water crisis!
          </Animated.Text>
          <Text className="text-base text-sky-500 mt-10">Email</Text>
          <Animated.View
            entering={FadeInUp.duration(1000).springify()}
            className="flex bg-white flex-row border-2 items-center h-[50] rounded-lg border-sky-200 p-2 shadow-2xl mt-2"
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
            <MaterialCommunityIcons
              name="email-outline"
              size={25}
              color={"skyblue"}
            />
            <TextInput
              placeholder="Enter your email here"
              className="placeholder:text-base ml-2 placeholder:text-sky-200"
              onChangeText={(mail) => setEmail(mail)}
              autoCapitalize="none"
            />
          </Animated.View>

          <Text className="text-base text-sky-500 mt-5">Password</Text>
          <Animated.View
            entering={FadeInUp.delay(200).duration(1000).springify()}
            className={`flex bg-white flex-row border-2 items-center h-[50] rounded-lg ${
              errors ? "border-red-500" : "border-sky-200"
            } p-2 shadow-2xl justify-between mt-2`}
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
            <View className="flex flex-row">
              <EvilIcons
                name="lock"
                size={30}
                color={errors ? "red" : "skyblue"}
              />
              <TextInput
                placeholder="Enter your password here"
                className="placeholder:text-base ml-2 placeholder:text-sky-200"
                secureTextEntry={!showPassword}
                onChangeText={(pass) => setPassword(pass)}
                autoCapitalize="none"
              />
            </View>
            <MaterialCommunityIcons
              name={`${showPassword ? "eye" : "eye-off"}`}
              size={22}
              color={errors ? "red" : "skyblue"}
              onPress={() => setShowPassword(!showPassword)}
            />
          </Animated.View>
          {errors && <InputError data={"Invalid username or password"} />}
          <Animated.View
            entering={FadeInUp.delay(400).duration(1000).springify()}
          >
            <TouchableOpacity
              className="bg-[#0aaafc] h-[50] rounded-full items-center justify-center mt-8 border-sky-200"
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
              onPress={handleLogin}
            >
              <Text className="text-white font-bold text-base">Sign In</Text>
            </TouchableOpacity>
            <View className="w-full flex-row  flex justify-center items-center">
              <Text>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.push("Signup")}>
                <Text className="text-[#0aaafc]">Sign Up</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
}
