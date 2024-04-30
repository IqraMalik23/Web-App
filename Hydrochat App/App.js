import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignupScreen";
import HomeScreen from "./screens/HomeScreen";
import PostScreen from "./screens/PostScreen";
import NearbyScreen from "./screens/NearbyScreen";
import DetailScreen from "./screens/DetailScreen";
import ReportScreen from "./screens/ReportScreen";
import DashboardScreen from "./screens/DashboardScreen";
import DepartmentScreen from "./screens/DepartmentScreen.";
import DepartmentDet from "./screens/DepartmentDet";

const Stack = createNativeStackNavigator();

export default function AnimatedStyleUpdateExample(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Posts" component={PostScreen} />
        <Stack.Screen name="Nearby" component={NearbyScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="Department" component={DepartmentScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Report" component={ReportScreen} />
        <Stack.Screen name="Dep-Det" component={DepartmentDet} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
