import {
  EvilIcons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Checkbox } from "react-native-paper";
import Animated, { FadeInUp } from "react-native-reanimated";
import Wave from "../assets/images/wave3.png";
import InputError from "../components/InputError";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase_config/config";
import Loading from "../components/Loading";

const SignUpScreen = () => {
  const [cpass, setCPass] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    mail: false,
    pass: false,
    cpass: false,
  });
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [showcPassword, setShowcPassword] = useState(false);

  const validate = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return reg.test(text);
  };

  const handleSignup = async () => {
    setLoading(true);
    let trigger = false;
    if (!agreed) {
      setLoading(false);
      return alert("Check the terms and condition checkbox");
    } else {
      if (validate(email)) {
        setErrors((prev) => ({ ...prev, mail: false }));
      } else {
        trigger = true;
        setErrors((prev) => ({ ...prev, mail: "Invalid Email" }));
      }
      if (password.length >= 8) {
        if (
          errors.pass === "The password should contain atleast 8 characters"
        ) {
          setErrors((prev) => ({ ...prev, pass: false }));
        }
      } else {
        setLoading(false);
        return setErrors((prev) => ({
          ...prev,
          pass: "The password should contain atleast 8 characters",
        }));
      }
      if (password === cpass) {
        setErrors((prev) => ({ ...prev, pass: false, cpass: false }));
      } else {
        trigger = true;
        setErrors((prev) => ({
          ...prev,
          pass: "Passwords do not match",
          cpass: "Passwords do not match",
        }));
      }
      if (trigger === false) {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          setCPass("");
          setEmail("");
          setPassword("");
          setLoading(false);
          setAgreed(false);
          navigation.push("Home");
        } catch (error) {
          console.log(error);
          setLoading(false);
          setErrors((prev) => ({ ...prev, mail: "Email already exists" }));
        }
      } else {
        setLoading(false);
      }
    }
  };

  return (
    <View>
      {loading && <Loading data={"Please Wait..."} />}
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
            <Text className="font-bold text-2xl">Join Us Today</Text>
            <MaterialIcons
              name="celebration"
              size={25}
              color={"gold"}
              style={{ marginLeft: 5 }}
            />
          </Animated.View>
          <Animated.Text
            entering={FadeInUp.duration(1000).springify()}
            className="text-gray-400 text-base"
          >
            Create an account and stay updated with the latest information on
            water crisis!
          </Animated.Text>
          <Text className="text-base text-sky-500 mt-8">Email</Text>
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
          {errors.mail && <InputError data={errors.mail} />}

          <Text className="text-base text-sky-500 mt-2">Password</Text>
          <Animated.View
            entering={FadeInUp.delay(200).duration(1000).springify()}
            className="flex bg-white flex-row border-2 items-center h-[50] rounded-lg border-sky-200 p-2 shadow-2xl justify-between mt-2"
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
              <EvilIcons name="lock" size={30} color={"skyblue"} />
              <TextInput
                placeholder="Enter your password here"
                className="placeholder:text-base ml-2 placeholder:text-sky-200"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                onChangeText={(pass) => setPassword(pass)}
              />
            </View>
            <MaterialCommunityIcons
              name={`${showPassword ? "eye" : "eye-off"}`}
              size={22}
              color={"skyblue"}
              onPress={() => setShowPassword(!showPassword)}
            />
          </Animated.View>
          {errors.pass && <InputError data={errors.pass} />}
          <Text className="text-base text-sky-500 mt-2">Confirm Password</Text>
          <Animated.View
            entering={FadeInUp.delay(300).duration(1000).springify()}
            className="flex bg-white flex-row border-2 items-center h-[50] rounded-lg border-sky-200 p-2 shadow-2xl justify-between mt-2"
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
              <EvilIcons name="lock" size={30} color={"skyblue"} />
              <TextInput
                placeholder="Confirm your password"
                className="placeholder:text-base ml-2 placeholder:text-sky-200"
                secureTextEntry={!showcPassword}
                autoCapitalize="none"
                onChangeText={(copass) => setCPass(copass)}
              />
            </View>
            <MaterialCommunityIcons
              name={`${showcPassword ? "eye" : "eye-off"}`}
              size={22}
              color={"skyblue"}
              onPress={() => setShowcPassword(!showcPassword)}
            />
          </Animated.View>
          {errors.cpass && <InputError data={errors.cpass} />}
          <Animated.View
            entering={FadeInUp.delay(400).duration(1000).springify()}
            className="flex flex-row items-center mt-2"
          >
            <Checkbox
              color="#00a6fc"
              status={agreed ? "checked" : "unchecked"}
              uncheckedColor="#bae6fd"
              onPress={() => setAgreed(!agreed)}
            />
            <Text className="text-gray-500">
              I agree with the
              <Text className="text-sky-500"> Terms & Conditions</Text>
            </Text>
          </Animated.View>
          <Animated.View
            entering={FadeInUp.delay(500).duration(1000).springify()}
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
              onPress={handleSignup}
            >
              <Text className="text-white font-bold text-base">Sign Up</Text>
            </TouchableOpacity>
            <View className="w-full flex-row  flex justify-center items-center">
              <Text>Aready have an account? </Text>
              <TouchableOpacity onPress={() => navigation.push("Login")}>
                <Text className="text-[#0aaafc]">Sign In</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUpScreen;
